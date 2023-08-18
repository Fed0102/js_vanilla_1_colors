const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', event => {
    event.preventDefault()
    // console.log(event.code);
    if (event.code.toLowerCase() === 'space') {
        setRandomColors();
    }
})
document.addEventListener('click', event => {
    // console.log(event.target.dataset);
    const type = event.target.dataset.type
    if (type === 'lock') {
        const node = event.target.tagName.toLowerCase() === 'i'
            ? event.target : event.target.children[0];
        node.classList.toggle('fa-lock-open');
        node.classList.toggle('fa-lock')
    } else if (type === 'copy') {
        copyToClickBoard(event.target.textContent);
    }
})

// const generateRandomColor = () => {
//     const hexCods = '0123456789ABCDEF';
//     let color = '';
//     for (let i = 0; i < 6; i++) {
//         color += hexCods[Math.floor(Math.random() * hexCods.length)];
//     }
//     return '#' + color;
// }
// ==================== instead of the chroma.random() ================ //

const copyToClickBoard = text => {
    return navigator.clipboard.writeText(text)
}

const setRandomColors = (isInitial) => {
    const colors = isInitial ? getColorsFromHash() : [];

    cols.forEach((col, index) => {
        const isLocked = col.querySelector('i')
            .classList.contains('fa-lock');
        const text = col.querySelector('h2');
        const button = col.querySelector('button');


        if (isLocked) {
            colors.push(text.textContent)
            return
        }

        const color = isInitial
            ? colors[index]
                ? colors[index]
                : chroma.random()
            : chroma.random();

        if (!isInitial) {
            colors.push(color);
        }

        text.textContent = color;
        col.style.background = color;
        setTextColor(text, color)
        setTextColor(button, color)
    })

    updateColorsHash(colors);
}

const setTextColor = (text, color) => {
    const luminance = chroma(color).luminance();
    text.style.color = luminance > 0.5 ? 'black' : 'white';
}

function updateColorsHash(colors = []) {
    document.location.hash = colors
        .map((col) => col.toString().substring(1)).join('-')
}

const getColorsFromHash = () => {
    if (document.location.hash.length > 1) {
        return document.location.hash
            .substring(1)
            .split('-')
            .map(color => `#` + color)
    }
    return []
}

setRandomColors(true);