/*Code to toggle header menu*/ 
function toggleMenu() {
    let header = document.getElementById('header__div');
    
    if (header.className === 'header-links') {
        header.className = 'header--responsive';
    } else header.className = 'header-links';
}

/*---------------------------------------------------*/