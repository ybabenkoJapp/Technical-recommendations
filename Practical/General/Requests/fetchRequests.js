const baseUrl = "https://jsonplaceholder.typicode.com/";

// concurrent requests => Comments (comments per each post)

async function fetchPosts() {
  return await fetch(baseUrl + "posts/").then((r) => r.json());
}

async function fetchComments(commentId) {
  return await fetch(baseUrl + `posts/${commentId}/comments`).then((r) =>
    r.json(),
  );
}

// async function fetchData() {
//   try {
//     const posts = await fetchPosts();
//     const data = [];
//     for (let post of posts) {
//       data.push(await fetchComments(post.id));
//     }
//     console.log("data: ", data);
//   } catch (error) {
//     console.error("[request failed]", error);
//   }
// }
//
// fetchData();

const fetchPostsJson = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error("[error happened]", error));
};

const fetchCommentsJson = (commentId) => {
  return fetch(baseUrl + `posts/${commentId}/comments`)
    .then((r) => r.json())
    .catch((error) => console.error("[error happened]", error));
};

fetchPostsJson(baseUrl + "posts?_page=1&_limit=15").then(data => console.log('data: ', data));

// function fetchPosts() {
//     return fetch(baseUrl + "posts?_page=1&_limit=15").then((r) => r.json());
// }

// function fetchComments(commentId) {
//     return fetch(baseUrl + `posts/${commentId}/comments`).then((r) => r.json());
// }

// async function fetchData() {
//   try {
//     const posts = await fetchPosts();
//     const data = [];
//     for (let post of posts) {
//       data.push(await fetchComments(post.id));
//     }
//     console.log("data: ", data);
//   } catch (error) {
//     console.error("[request failed]", error);
//   }
// }
//
// fetchData();


// function loadParallelRequests() {
//     // fetchPosts
//     // fetchComments
//     // show in console.log(Posts & Comments)
// }
//
// function loadSequentialRequests() {
//     // fetchPosts
//     // fetchComments
//     // show in console.log(Posts & Comments)
// }
//
//
// const promiseUsers = new Promise((approve) => {
//     approve('Users');
// });
//
// const promiseComments = new Promise((approve) => {
//     approve('Comments');
// });
//
// const promiseRaiting = new Promise((approve) => {
//     approve('Raiting');
// });
//
// promiseUsers.then((users) => {
//
//     promiseComments.then(() => {
//
//         promiseRaiting.then(() => {
//
//             // Users -> Comments -> Raiting
//
//         });
//
//     });
//
// });
//
//
// promiseUsers
//     .then((users) => promiseComments(userIds))
//     .then((comments) => promiseRaiting(comments))
//     .then((rating) => {
//         console.log(rating)
//     });
//
//
// [1, 3 , 7]
//     .map((i) => i)
//     .filter(Boolean)
//     .every((i) => i)