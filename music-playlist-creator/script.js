// dynamically created playlist cards
document.addEventListener("DOMContentLoaded", () => {
    function playlistCreator() {
        const playlistsContainer = document.querySelector('.playlist-cards');
        data.playlists.forEach(playlist => {

            // create card
            const playlistCard = document.createElement('div');
            playlistCard.className = 'card';
            // card image
            let coverImage = document.createElement('img');
            coverImage.className = 'playlist_art';
            coverImage.src = playlist.playlist_art;

            // playlist name
            let playlistName = document.createElement('h3');
            playlistName.className = 'playlist-title';
            playlistName.textContent = playlist.playlist_name;

            // playlist creator
            let playlistCreator = document.createElement('p');
            playlistCreator.className = 'creator-name';
            playlistCreator.textContent = playlist.playlist_creator;

            // like count and icon
            let heartIcon = document.createElement('span');
            heartIcon.className = 'heart-icon';
            heartIcon.innerHTML = '&#x2665';
            let likeCount = document.createElement('span');
            likeCount.className = 'like-count';
            likeCount.textContent = playlist.likeCount;

            // append the elements
            playlistCard.appendChild(coverImage);
            playlistCard.appendChild(playlistName);
            playlistCard.appendChild(playlistCreator);
            playlistCard.appendChild(heartIcon);
            playlistCard.appendChild(likeCount);


            playlistCard.addEventListener("click", (event) => {
                // if the user does not click on the heart
                if (!event.target.classList.contains(".heart-icon")) {
                    openModal(playlist);
                }
        
                // enable the user to like the playlist
                heartIcon.addEventListener("click", (event) => {
                    event.stopPropagation();
                    const likeCountElement = heartIcon.nextElementSibling;
                    let likeCount = parseInt(likeCountElement.textContent);
                    if(likeCount === 1){
                        likeCount--;
                        heartIcon.classList.remove("liked");
                        likeCountElement.textContent = likeCount;
                    }
                    else if(likeCount === 0){
                        likeCount++;
                        heartIcon.classList.add("liked");
                        likeCountElement.textContent = likeCount;
                    }
                });
        
                return playlistCard;
            });


            playlistsContainer.appendChild(playlistCard);

        });
    }

    playlistCreator();

    //const playlistCard = getElementById("card");
    // playlistCard.addEventListener("click", (event) => {
    //     // if the user does not click on the heart
    //     if (!event.target.classList.contains(".heart-icon")) {
    //         openModal(playlist);
    //     }

    //     // enable the user to like the playlist
    //     heartIcon.addEventListener("click", (event) => {
    //         event.stopPropagation();
    //         const likeCountElement = heartIcon.nextElementSibling;
    //         let likeCount = parseInt(likeCountElement.textContent);
    //         likeCount++;
    //         heartIcon.classList.add("liked");
    //         likeCountElement.textContent = likeCount;
    //     });

    //     return playlistCard;
    // });

function openModal(playlist) {
    const modal = document.getElementById("myModal");
    document.getElementById("modal-cover").src = playlist.playlist_art;
    document.getElementById("modal-name").textContent = playlist.playlist_name;
    document.getElementById("modal-creator").textContent = `Creator: ${playlist.playlist_creator}`;
    const songList = document.getElementById("modal-songs");
    songList.innerHTML = ""; // clears past loaded songs
    playlist.songs.forEach(song => {
        const songItem = document.createElement("li");
        songItem.textContent = `${song.title} - ${song.artist} - ${song.duration}`;
        songList.appendChild(songItem);
    });
    modal.style.display = "block";
}

//close the modal 
document.querySelector(".close-button").addEventListener("click", ()=>
    {document.getElementById("myModal").style.display='none';

    });

//shuffle songs in the modal
document.getElementById("shuffle-button").addEventListener("click", ()=>{
    const songList = document.getElementById("modal-songs");
    const songs = Array.from(songList.children);
    songs.sort(() => Math.random() - 0.5);
    songList.innerHTML = ""; // Clear existing songs
    songs.forEach((song) => songList.appendChild(song)); // Append shuffled songs
  });
});