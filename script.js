const files = [
    {
        name: "Backrooms (2026)",
        description: "After a therapist's patient disappears into a dimension beyond reality, she must venture into the unknown to save him.",
        type: "MKV",
        size: "1.4 GB",
        thumbnail: "https://cdn.mos.cms.futurecdn.net/mFTTk8BYNLwnfgWBDhATVo-1200-80.jpg",
        downloadUrl: "https://github.com/Montero3456/project-pirates/releases/download/Backrooms/Backrooms.mkv"
    },

    {
        name: "Example Application",
        description: "Example application download.",
        type: "EXE",
        size: "120 MB",
        thumbnail: "https://placehold.co/600x400/15191e/ffb52e?text=Application",
        downloadUrl: "https://example.com/application.exe"
    }
];

const fileGrid = document.getElementById("fileGrid");
const search = document.getElementById("search");
const empty = document.getElementById("empty");
const fileCount = document.getElementById("fileCount");

function escapeHTML(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function createCard(file) {
    return `
        <div class="file-card">

            <div class="thumbnail-wrapper">
                <img
                    class="thumbnail"
                    src="${file.thumbnail}"
                    alt="${escapeHTML(file.name)}"
                    onerror="this.src='https://placehold.co/600x400/15191e/ffb52e?text=No+Thumbnail'"
                >

                <div class="thumbnail-overlay"></div>
            </div>

            <div class="file-info">

                <h2 class="file-name">
                    ${escapeHTML(file.name)}
                </h2>

                <p class="description">
                    ${escapeHTML(file.description)}
                </p>

                <div class="metadata">
                    <span class="tag">
                        ${escapeHTML(file.type)}
                    </span>

                    <span class="tag">
                        ${escapeHTML(file.size)}
                    </span>
                </div>

                <a
                    class="download-btn"
                    href="${file.downloadUrl}"
                    download
                >
                    ↓ Download
                </a>

            </div>

        </div>
    `;
}

function displayFiles(searchTerm = "") {

    const searchText = searchTerm.toLowerCase().trim();

    const filteredFiles = files.filter(file => {

        return (
            file.name.toLowerCase().includes(searchText) ||
            file.description.toLowerCase().includes(searchText) ||
            file.type.toLowerCase().includes(searchText)
        );

    });

    fileGrid.innerHTML = "";

    filteredFiles.forEach(file => {
        fileGrid.innerHTML += createCard(file);
    });

    if (fileCount) {
        fileCount.textContent =
            `${filteredFiles.length} ${filteredFiles.length === 1 ? "file" : "files"}`;
    }

    if (filteredFiles.length === 0) {
        empty.style.display = "block";
    } else {
        empty.style.display = "none";
    }
}

if (search) {
    search.addEventListener("input", () => {
        displayFiles(search.value);
    });
}

displayFiles();
