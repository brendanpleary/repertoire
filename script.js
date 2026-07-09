const songList = document.getElementById("song-list");
const capoSelect = document.getElementById("capo-select");
const songCount = document.getElementById("song-count");

let songs = [];

function updateSongList(selectedCapo) {
    songList.innerHTML = "";
    let visibleSongCount = 0; 
    for (const song of songs) { 
        if (song.capo === selectedCapo) {
            visibleSongCount++;
            const listItem = document.createElement("li");
            let displayTitle = song.title;
            if (song.tuning !== "Standard"){
                displayTitle += ` (${song.tuning})`
            } 
            listItem.textContent = displayTitle;
            songList.appendChild(listItem);
        }
    }
    songCount.textContent = `${visibleSongCount} of ${songs.length} songs`;
}

capoSelect.addEventListener("change", () => {
    updateSongList(Number(capoSelect.value));
});

fetch("songs.json")
  .then(response => response.json())
  .then(data => {
    songs = data;

    updateSongList(Number(capoSelect.value));
    
  });