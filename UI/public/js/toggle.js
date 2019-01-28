/*Code to toggle header menu*/ 
function toggleMenu() {
    let header = document.getElementById('header__div');
    
    if (header.className === 'header-links') {
        header.className = 'header--responsive';
    } else header.className = 'header-links';
}

/*Code to toggle 'add comment' box*/

let addComment = document.getElementsByClassName("add-comment-button");
let addCommentCancel = document.getElementsByClassName("comment-cancel-button");
let commentSections = document.getElementsByClassName("comment-section");

for (let i = 0; i <= addComment.length - 1; i++) {
    addComment.item(i).addEventListener('click', toggleCommentSection);
    addCommentCancel.item(i).addEventListener('click', toggleCommentSection);
    
    function toggleCommentSection() {
        let comment = commentSections.item(i);

        if (comment.style.display === 'block') comment.style.display = 'none';
            else comment.style.display = 'block';
    }
}
/*---------------------------------------------------*/