let readerMode = false;

const revertPosts = () => {
    const postList = document.getElementById('post_list');
    postList.querySelectorAll('.postContainer')
        .forEach(post => postList.insertBefore(post, postList.firstChild));
};

const setMode = () => {
    revertPosts();
    document.body.classList.toggle('joyreader', readerMode);
};

browser.runtime.onMessage.addListener(async ({isReader}) => {
    if (isReader !== readerMode) {
        readerMode = isReader;
        setMode();
    }
    return {isReader: readerMode};
});