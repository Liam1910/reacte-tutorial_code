function deletes(id) {
    fetch('http://localhost:7000/blogs/' + id, {
        method: 'DELETE'
    }) 
}

function create(title, body, author) {
    const data = { title, body, author };

    fetch('http://localhost:7000/blogs/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
}

function createTimes(number) {
    let i = 0;
    
    while (i < number) {
        create(`Number ${Math.random() * 20}`, `Number ${Math.random() * 10}`, "Author");
        i++;
    }
}
function deletesTimes(number) {
    let i = 0;

    while (i < number) {
        deletes(i);
        i++;
    }
}

createTimes(50);