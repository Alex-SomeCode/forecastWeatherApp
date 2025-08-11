export class LoadAnimation {

    static state = {
        loadAnimation: { idValue: "loadAnimation", element: null },
    };

    static createLoadAnimatoin() {
        const wrapperAnimation = document.createElement("div");
        wrapperAnimation.classList.add("wrapperLoadAnimation");
        for (let i = 0; i < 12; i++) {
            let div = document.createElement("div");
            div.classList.add("lines");
            wrapperAnimation.appendChild(div);
        }

        this.state.loadAnimation.element = wrapperAnimation;
        wrapperAnimation.id = this.state.loadAnimation.idValue;
    }

    static addLoadAnimation({ insertBeforeP = null, addTo }) {
        insertBeforeP &&
            insertBeforeP.parentNode.insertBefore(
                this.state.loadAnimation.element,
                insertBeforeP.nextSibling
            );

        addTo && addTo.appendChild(this.state.loadAnimation.element);
    }

    static removeLoadAnimation() {
        this.state.loadAnimation.element.remove();
    }
}
