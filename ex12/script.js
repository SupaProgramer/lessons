class Options {
    constructor(width = 200, height = 200, bg = 'red', text = 'war', fontSize = 14, textAlign = 'right') {
        this.width = width;
        this.height= height;
        this.bg = bg;
        this.fontSize = fontSize;
        this.textAlign = textAlign;
        this.text = text;
    }
    createDiv() {
        let div = document.createElement('div');
        div.style.cssText = `
        width: ${this.width}px;
        height: ${this.height}px;
        background-color: ${this.bg};
        font-size: ${this.fontSize}px;
        text-align: ${this.textAlign};
        `;
        div.textContent = this.text;
        document.body.appendChild(div);
    }
}
let bth = document.querySelector('button');

bth.addEventListener('click', () => {
    let fields = document.querySelectorAll('input'),
        div = new Options(fields[0].value,fields[1].value,fields[2].value,fields[3].value,fields[4].value,fields[5].value);
        div.createDiv();
});