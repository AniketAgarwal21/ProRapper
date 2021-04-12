import React from 'react'

function Home() {

    // document.querySelector('.micBtn')
    // document.querySelector('.rap-holder')

    let listening = false
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.onstart = function () {
        console.log("We are listening. Try speaking into the microphone.");
    };

    const start = () => {
        recognition.start();
        document.querySelector('.micBtn').innerText = 'Stop Rapping?'
    };

    const stop = () => {
        recognition.stop();
        document.querySelector('.micBtn').innerText = 'Start Rapping!'
    };

    const onResult = event => {
        document.querySelector('.rap-holder').innerHTML = "";

        // let transcript = event.results[0][0].transcript;
        // console.log(event.results[0][0].confidence);
        let word

        for (const res of event.results) {
            const text = document.createTextNode(res[0].transcript);
            const p = document.createElement("span");
            const bool = true
            if (res.isFinal) {
                // console.log(res);
                p.classList.add("text-white");
                let n = res[0].transcript.split(" ");
                if (word !== undefined && word === n[n.length - 1]) {
                    break
                }
                word = n[n.length - 1];
                // console.log(word);
                fetch(`https://rhymebrain.com/talk?function=getRhymes&word=${word}&maxResults=10&lang=en`)
                    .then((res) => res.json())
                    .then((data) => {
                        // console.log(data);
                        document.querySelector('.rhymes').innerText = ""
                        data.forEach(object => {
                            document.querySelector('.rhymes').innerText += ` ${object.word}`
                        });
                        // for (let i = 0; i < 20; i++) {
                        // }
                    })
            }
            p.appendChild(text);
            document.querySelector('.rap-holder').appendChild(p);
        }
    };

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.addEventListener("result", onResult);

    return (
        <>
            <section className="text-gray-400 bg-gray-900 body-font h-screen">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto">
                        <h1 className="rap-holder flex-grow sm:pr-16 text-2xl font-medium title-font text-grey">Your Rap Here</h1>
                        <button className="micBtn flex-shrink-0 text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg mt-10 sm:mt-0" onClick={() => {
                            listening ? stop() : start();
                            listening = !listening;
                        }}>Start Rapping!</button>
                    </div>
                </div>
                <hr className="w-2/3 mx-auto" />
                <div className="rhymes container my-20 text-center text-2xl">Rhymes Here</div>
            </section>

        </>
    )
}

export default Home
