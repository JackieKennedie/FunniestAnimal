window.addEventListener("load", async () => {
    const response = await fetch('/api');
    const animal_data = await response.json();
    const leaderboard = document.querySelector("#Leaderboard");
    
    for(let i = 0; i < animal_data.length; i++) {
        const animal = document.createElement("div");
        animal.classList.add("animal");

        const content = document.createElement("div");
        content.classList.add("content");

        const rank = document.createElement("li");
        rank.classList.add("rank");

        const image = document.createElement("h2");
        image.classList.add("image");;
        image.innerHTML = animal_data[i].image;

        const name = document.createElement("h3");
        name.classList.add("name");
        name.innerHTML = animal_data[i].name;

        const score = document.createElement("p");
        score.classList.add("score");
        score.innerHTML = "Score: " + animal_data[i].score;

        animal.appendChild(content);
        content.appendChild(rank);
        content.appendChild(image);
        content.appendChild(name);
        content.appendChild(score);


        leaderboard.appendChild(animal);

    }
});


document.getElementById("send").addEventListener("click", async (e) => {
    e.preventDefault();

    const user_score = document.querySelector("input[name='score']:checked").value;

    console.log(user_score);

    const data = {user_score, _id: 1};

    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    };

    const response = await fetch('/api', options);
    const json = await response.json();
    
    console.log(json);
});


