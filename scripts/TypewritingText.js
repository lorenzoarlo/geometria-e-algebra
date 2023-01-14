// ----- MUST HAVE ATTRIBUTEs
// -> text = ?""
// -> typing-speed = int
// -> erasing-speed = int
// -> still-time = int

// ----- CHILDRENS
// -> <word>Parola</word>

class TypewritingText extends HTMLElement {

    static DEFAULT_TYPING_SPEED = 0.15 * 1000;
    static DEFAULT_ERASING_SPEED = 0 * 1000;
    static DEFAULT_STILL_TIME = -1;


    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        
        let styleElement = document.createElement("link");
        styleElement.href = "../styles/TypewritingText-style.css";
        styleElement.rel = "stylesheet";
        this.shadowRoot.appendChild(styleElement);

        this.span = document.createElement("span");
        this.span.className = "animated-text";
        this.shadowRoot.appendChild(this.span);

        this.words = [];
    }

    connectedCallback() {
        Array.from(this.children).filter(el => el.tagName == "WORD").forEach(wordElement => {
            this.words.push(wordElement.innerText);
        });

        // Default attributes value
        if (!this.hasAttribute("typing-speed")) this.setAttribute("typing-speed", TypewritingText.DEFAULT_TYPING_SPEED);
        if (!this.hasAttribute("still-time")) this.setAttribute("still-time", TypewritingText.DEFAULT_STILL_TIME);
        if (!this.hasAttribute("erasing-speed")) this.setAttribute("erasing-speed", TypewritingText.DEFAULT_ERASING_SPEED);


        let typingSpeed = parseFloat(this.getAttribute("typing-speed"));
        let stillTime = parseFloat(this.getAttribute("still-time"));
        let erasingSpeed = parseFloat(this.getAttribute("erasing-speed"));
        
        TypewritingText.write_typewriting(this.span, this.words, typingSpeed, stillTime, erasingSpeed);
    }

    // -> erasingSpeed, 0 to not cancel
    // -> stillTime = -1, to not loop
    static write_typewriting(element, words, typingSpeed, stillTime, erasingSpeed) {
        return new Promise(async resolve => {
            for(let i = 0; i < words.length; i++) {
                await TypewritingText.singleWord_typewriting(element, words[i], typingSpeed);
                if(stillTime != -1) 
                {
                    await TypewritingText.waitFor(stillTime);
                    await TypewritingText.erase_typewriting(element, erasingSpeed);    
                }
            }
            resolve();
            if(stillTime != -1) TypewritingText.write_typewriting(element, words, typingSpeed, stillTime, erasingSpeed);
        });
    }

    static async singleWord_typewriting(element, finalText, typingSpeed) {
        return new Promise(async resolve => {
            for(let i = 0; i < finalText.length; i++) {
                element.innerText = finalText.substring(0, i + 1);
                await TypewritingText.waitFor(typingSpeed);
            }
            resolve();
        });
    }

    static async erase_typewriting(element, erasingSpeed) {
        return new Promise(async resolve => {
            let initialLength = element.innerText.length;
            for(let i = 0; i < initialLength; i++) {
                element.innerText = element.innerText.substring(0, element.innerText.length - 1);
                await TypewritingText.waitFor(erasingSpeed);
            }
            resolve();
        });
    }

    static waitFor = time => new Promise(resolve => setTimeout(resolve, time));
}

document.currentScript.onload = () => customElements.define("typewriting-text", TypewritingText);