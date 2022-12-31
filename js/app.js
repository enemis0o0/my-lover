let text;
let height = 0;
let interval;

let initialization = () => {
     getText();
     actualizateHeight();
     loadParticles();
     link();
};

window.onload = initialization;

let loadParticles = () => {
     particlesJS.load(
          `particles-js`,
          "../resources/particlesConfig/particlesjs-config.json",
          function () {
               console.log(`callback - particles.js config loaded`);
          }
     );
};

let actualizateHeight = () => {
     let actualHeight = document.documentElement.scrollHeight;
     if (height < actualHeight) {
          document.styleSheets[0].cssRules[6].style.height =
               actualHeight + "px";

          window.scroll(0, actualHeight);
          height = actualHeight;
     }
     console.log("actualizado");
};

let buildFooter = () => {
     document.getElementsByClassName("buttons")[0].style.left = "0";

     setTimeout(() => {
          document.getElementsByClassName("footer")[0].style.color =
               "var(--mainFontColor)";
     }, 4000);
};

let typing = () => {
     let typed = new Typed("#typed", {
          strings: ["", text],
          stringsElement: null,
          typeSpeed: 40,
          startDelay: 0,
          showCursor: true,
          cursorChar: "|",
          autoInsertCss: true,
          preStringTyped: (arrayPos, self) => {
               interval = setInterval(() => {
                    actualizateHeight();
               }, 500);
          },
          onStringTyped: (arrayPos, self) => {
               clearInterval(interval);
          },
          onComplete: (self) => {
               buildFooter();
          },
     });
};

let getText = async () => {
     let res = await fetch("../resources/message.txt");
     text = await res.text();
     typing();
};
