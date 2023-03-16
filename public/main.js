window.addEventListener("load", async () => {
    const response = await fetch('/api');
    const animal_data = await response.json();
    const leaderboard = document.querySelector("#Leaderboard");

    const x = animal_data.sort((a, b) => {
        if(a.score > b.score) {
            return -1;
        }
    });

    //console.log(animal_data);
    
    animal_data.forEach((item) => {
        //console.log(item.name + " " + item._id);

        const animal = document.createElement("div");
        animal.classList.add("animal");

        const content = document.createElement("div");
        content.classList.add("content");

        const rank = document.createElement("li");
        rank.classList.add("rank");

        const image = document.createElement("h2");
        image.classList.add("image");
        image.innerHTML = item.image;

        const name = document.createElement("h3");
        name.classList.add("name");
        name.innerHTML = item.name;

        const score = document.createElement("p");
        score.classList.add("score");
        score.innerHTML = "Score: " + item.score.toFixed(2);

        const score_form = document.createElement("form");
        score_form.classList.add("score-form");

        for(let i = 1; i <= 5; i++) {
            const score_num = document.createElement("input");
            const score_label = document.createElement("label");

            score_label.innerHTML = i;
            score_label.name = "score";

            score_num.classList.add("score-num");
            score_num.type = "radio";
            score_num.name = "score";
            score_num.value = i;

            score_form.appendChild(score_num);
            score_form.appendChild(score_label);
        }

        const score_submit = document.createElement("button");
        score_submit.classList.add("score-sub");
        score_submit.innerHTML = "Submit";
        score_form.appendChild(score_submit);

        score_submit.addEventListener("click", async (e) => {
            e.preventDefault();
            window.location.reload();

            const user_score = document.querySelector("input[name='score']:checked").value;
            console.log(user_score);

            const data = {user_score, _id: item._id};

            //console.log(data._id);

            const options = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            };

            const request = await fetch('/api', options);

            /*
            const json = await response.json();
            
            console.log(json);
            */
            
        });

        animal.appendChild(content);

        content.appendChild(rank);
        content.appendChild(image);
        content.appendChild(name);
        content.appendChild(score);

        content.appendChild(score_form);

        leaderboard.appendChild(animal);
    }); 
});