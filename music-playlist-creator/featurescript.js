document.addEventListener("DOMContentLoaded", () => {
    const playlists = data.playlists;
    const featuredPlaylist = playlists[Math.floor(Math.random() * playlists.length)];
    const playlistName = featuredPlaylist.playlist_name;
    const playlistCreator = featuredPlaylist.playlist_creator;
    const songList = featuredPlaylist.songs;

    function createFeaturedPlaylist() {
        const playlistCard = document.createElement('div');
        playlistCard.className = 'card';

        const coverImage = document.createElement('img');
        coverImage.className = 'playlist_art';
        coverImage.src = featuredPlaylist.playlist_art;
        playlistCard.appendChild(coverImage);

        const nameElement = document.createElement('h3');
        nameElement.className = 'playlist-title';
        nameElement.textContent = playlistName;
        playlistCard.appendChild(nameElement);

        const creatorElement = document.createElement('p');
        creatorElement.className = 'creator-name';
        creatorElement.textContent = `Created by: ${playlistCreator}`;
        playlistCard.appendChild(creatorElement);

        return playlistCard;
    }

    const featuredPlaylistContainer = document.querySelector('.playlist-card-feature-page');
    const featuredPlaylistCard = createFeaturedPlaylist();
    featuredPlaylistContainer.appendChild(featuredPlaylistCard);

    const songListContainer = document.querySelector('.song-list');
    songList.forEach(song => {
        const songContainer = document.createElement('div');
        songContainer.textContent = `${song.title} - ${song.artist} - ${song.duration}`;
        songListContainer.appendChild(songContainer);
    });
});
