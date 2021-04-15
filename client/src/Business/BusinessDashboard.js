import {Component} from 'react';
import AltHeader from '../AltHeader';
import ProductsDashboard from './ProductsDashboard';
import DashboardHeader from './DashboardHeader';


export default class BusinessDashboard extends Component{

    constructor(props){
        super(props)
        console.log(this.props.history)
        this.state = {
            "dashboard_name": "home"
        }

    }
    setDashboard(name){
        this.setState({
            "dashboard_name": name
        })

    }

    renderDashboard(){
        
        let {dashboard_name} = this.state;
        if(dashboard_name=="products"){
            return(<ProductsDashboard/>)
        }
        else{
           return( <h1>Overview</h1>)
        }
    }
    render(){
    
        return (
        <>
        <AltHeader dashboard/>
        <DashboardHeader renderDashboard={this.setDashboard.bind(this)}/>
        {this.renderDashboard()}
        </>
        )
    }

}