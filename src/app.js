const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkZXNnZGVtdGRmYnFiaWR6ZWV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEwMzY4OTgsImV4cCI6MTk5NjYxMjg5OH0.CgSPGLVfbL2nF1gakBsh6633VnsUu-tJXTI4k65XSaY";
const url = "https://adesgdemtdfbqbidzeeu.supabase.co";

const supa = supabase.createClient(url, key);

const registerForm = document.getElementById("register-form");

const modalBtn = document.getElementById("modal-btn");
const regModal = document.getElementById("register-modal");
const counterSpan = document.getElementById("registration-count");

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

modalBtn.addEventListener("click", (e) => {
  e.preventDefault();
  regModal.style.display = "none";
});

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const { data, error } = await supa
    .from("users")
    .select("email")
    .or("email.eq." + e.target.email.value);

  const div = regModal.getElementsByTagName("div")[0];
  const h2 = div.getElementsByTagName("h2")[0];
  if (
    e.target.username.value === "" ||
    e.target.email.value === "" ||
    e.target.birthday.value === ""
  ) {
    h2.innerHTML = "Please fill in all the fields!";
  } else if (!validateEmail(e.target.email.value)) {
    h2.innerHTML = "Please enter a valid email!";
  } else if (data.length > 0) {
    h2.innerHTML = "Email already in use. Try again!";
  } else {
    const { data, count } = await supa
      .from("users")
      .select("*", { count: "exact" });
    counterSpan.innerHTML = count + 1;
    // console.log(count)
    const { error } = await supa.from("users").insert({
      id: count,
      username: e.target.username.value,
      email: e.target.email.value,
      birthdate: new Date(e.target.birthday.value),
    });
    console.log(error);
    if (error) {
      h2.innerHTML = "Something went wrong. Try again!";
    } else {
      h2.innerHTML = "Registration complete! your ID is " + count;
    }
  }
  regModal.style.display = "flex";
});

window.addEventListener("DOMContentLoaded", async (e) => {
  e.preventDefault();
  const { data, count } = await supa
    .from("users")
    .select("*", { count: "exact" });
  counterSpan.innerHTML = count;
});

// const observer = new IntersectionObserver((entries) => {
//   console.log(entries);
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       entry.target.classList.add("fadeInUp");
//     }
//   });
// });

// // Tell the observer which elements to track
// observer.observe(document.getElementsByTagName("ul"));
// F**** Vercel!

var useless = "";
const uls = document.getElementsByTagName("ul");
console.log(uls[0]);
const observers = [];
for (ii = 0; ii < uls.length; ii++) {
  observers.push(
    new IntersectionObserver((entries) => {
      console.log(entries);
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fadeInUp");

          return;
        }
        // entry.target.classList.remove("fadeInUp");
      });
    })
  );

  observers[ii].observe(uls[ii]);
}
