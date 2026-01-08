async function getxt(file: string) {
        let x = await fetch(file);
        let y = await x.text();
        const el = document.getElementById("demo");
        if (el) {
            el.innerText = y;
        } else {
            console.warn('Element with id "demo" not found');
        }

}