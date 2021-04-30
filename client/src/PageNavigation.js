import React from 'react';

export default ( props ) => {
	const {
		      loading,
		      showPrevLink,
		      showNextLink,
		      handlePrevClick,
		      handleNextClick,
			  currentPageNo,
			  totalPages
	      } = props;
	return (
		<div className="nav-link-container">
			<p style={{marginRight: "20px", marginTop: "10px", marginBottom: "10px"}}> Showing Page {currentPageNo} out of {totalPages}</p>
			<a
				href="#"
				className={
					`nav-link 
					${ showPrevLink ? 'show' : 'greyed-out'}
					${ loading ? 'greyed-out' : ''
					}`
				}
				onClick={ handlePrevClick }
			>
				Previous
			</a>
			<a
				href="#"
				className={
					`nav-link 
					${ showNextLink ? 'show' : 'greyed-out'}
					${ loading ? 'greyed-out' : '' }
					`}
				onClick={ handleNextClick }
			>
				Next
			</a>
		</div>
	)
}
