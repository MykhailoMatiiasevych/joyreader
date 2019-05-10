browser.runtime.onMessage.addListener(() => {
    const postList = document.getElementById('post_list');
    postList.querySelectorAll('.postContainer').forEach(post => postList.insertBefore(post, postList.firstChild));
});