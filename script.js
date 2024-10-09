document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    const contactList = document.getElementById("contactList");

    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    const renderContacts = () => {
        contactList.innerHTML = "";
        contacts.forEach((contact, index) => {
            const li = document.createElement("li");

            const contactInfo = document.createElement("div");
            contactInfo.textContent = `${contact.firstName} ${contact.lastName} — Телефон: ${contact.phone}, Email: ${contact.email}`;

            const editButton = document.createElement("button");
            editButton.textContent = "Редагувати";
            editButton.classList.add("edit");
            editButton.addEventListener("click", () => {
                const newFirstName = prompt("Введіть нове ім'я:", contact.firstName);
                const newLastName = prompt("Введіть нове прізвище:", contact.lastName);
                const newPhone = prompt("Введіть новий телефон:", contact.phone);
                const newEmail = prompt("Введіть новий email:", contact.email);
                if (newFirstName && newLastName && newPhone && newEmail) {
                    contacts[index] = {
                        firstName: newFirstName,
                        lastName: newLastName,
                        phone: newPhone,
                        email: newEmail
                    };
                    localStorage.setItem("contacts", JSON.stringify(contacts));
                    renderContacts();
                }
            });

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Видалити";
            deleteButton.addEventListener("click", () => {
                contacts.splice(index, 1);
                localStorage.setItem("contacts", JSON.stringify(contacts));
                renderContacts();
            });

            li.appendChild(contactInfo);
            li.appendChild(editButton);
            li.appendChild(deleteButton);
            contactList.appendChild(li);
        });
    };

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Зупиняємо стандартну поведінку форми

        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();

        if (!firstName || !lastName || !phone || !email) {
            alert("Будь ласка, заповніть усі поля.");
            return;
        }

        const newContact = { firstName, lastName, phone, email };
        contacts.push(newContact);
        localStorage.setItem("contacts", JSON.stringify(contacts));

        // Очищаємо поля форми
        contactForm.reset();

        // Оновлюємо список контактів
        renderContacts();
    });

    renderContacts();
});
