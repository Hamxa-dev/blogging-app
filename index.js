import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { collection, addDoc, Timestamp, getDocs, where, query, orderBy, deleteDoc, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { auth, db } from './dist/config.js';



document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById('loginButton');
    const logoutButton = document.getElementById('logoutButton');
    const settingList = document.getElementById('settingList');

    const toggleLoginLogout = (isLoggedIn) => {
        if (isLoggedIn) {
          loginButton.style.display = 'none';
          logoutButton.style.display = 'block';
        } else {
          loginButton.style.display = 'block';
          logoutButton.style.display = 'none';
        }
      };
  
    // Check authentication state
    
    onAuthStateChanged(auth, (user) => {
        if (user) {
          toggleLoginLogout(true);
        } else {
          toggleLoginLogout(false);
        }
      });
    });

    // Logout function

    logoutButton.addEventListener('click', () => {
        signOut(auth).then(() => {
            window.location = './login.html';
        }).catch((error) => {
            console.log(error);
        });
    });

    //distinct periods of the day function

const currentTime = new Date();
const currentHour = currentTime.getHours();
const time = document.querySelector('#time');

const getGreeting = () => {
    if (currentHour >= 5 && currentHour < 12) return 'Good Morning';
    else if (currentHour >= 12 && currentHour < 17) return 'Good Afternoon';
    else if (currentHour >= 17 && currentHour < 21) return 'Good Evening';
    else return 'Good Night';
};

// All Blogs Work

const renderAllBlogs = async () => {
    const usersData = (await getDocs(collection(db, "users"))).docs.map(user => user.data());
    const postsData = (await getDocs(collection(db, "posts"))).docs.map(post => ({ ...post.data(), docId: post.id }));

postsData.forEach(async item => {
    const user = usersData.find(userData => userData.uid === item.uid);
    const postTime = new Date(item.postDate.seconds * 1000).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
    
    let postImg = '';
    
    if (user) {
        postImg = user.profileUrl || '';
    }

        const blogHTML = `
            <div class="bg-white p-8 rounded-lg mb-5 shadow-2xl max-w-xl ml-40 w-full">
                <div class="flex gap-5">
                    <div class="mb-4 text-center">
                        <img src="${postImg}" class="rounded-xl w-20 h-20 mb-4" id="blog-img">
                    </div>
                    <div class="w-1/2">
                        <h2 class="text-xl font-bold text-[#212529] whitespace-normal break-words">${item.title}</h2>
                        <h5 class="text-sm mt-1 text-[#6C757D]">${user.firstName} ${user.lastName} ${postTime}</h5>
                    </div>
                </div>
                <p class="text-[#6C757D] text-sm mt-3 whitespace-normal break-words">${item.description}</p>
                <div class="flex mt-3 text-sm">
                    <a href="userblog.html?uid=${user.uid}" class="bg-transparent border-none text-[#7749F8]  mr-20" id="user-link">See all from this user</a>
                </div>
            </div> `;
            document.querySelector('#AllBlogsContainer').innerHTML += blogHTML;
});
};

document.addEventListener("DOMContentLoaded", async () => {
    const greeting = getGreeting();
    const greetingText = document.createTextNode(`${greeting} Readers!`);
    time.appendChild(greetingText);

    await renderAllBlogs();
});