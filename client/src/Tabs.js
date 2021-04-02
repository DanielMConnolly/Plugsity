import {Component} from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab'

class Tabs extends Component {
    static propTypes = {
      children: PropTypes.instanceOf(Array).isRequired,
      onClick: PropTypes.func
    }
  
    constructor(props) {
      super(props);
  
      this.state = {
        activeTab: this.props.children[0].props.label,
      };
    }
  
    onClickTabItem = (tab) => {
      this.props.onClick(tab)
      this.setState({ activeTab: tab });
    }

    render() {
        const {
          onClickTabItem,
          props: {
            children,
          },
          state: {
            activeTab,
          }
        } = this;
        console.log(this.props);
    
        return (
          <div className="tabs">
            <div className={ this.props.center?"center tab-list":"tab-list"}>
              {children.map((child) => {
                const { label } = child.props;
    
                return (
                  <Tab
                    activeTab={activeTab}
                    key={label}
                    label={label}
                    onClick={onClickTabItem}
                  />
                );
              })}
            </div>
            <div className="tab-content">
              {children.map((child) => {
                if (child.props.label !== activeTab) return undefined;
                return child.props.children;
              })}
            </div>
          </div>
        );
      }
    }
    
    export default Tabs;