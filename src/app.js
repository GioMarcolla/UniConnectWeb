const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkZXNnZGVtdGRmYnFiaWR6ZWV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEwMzY4OTgsImV4cCI6MTk5NjYxMjg5OH0.CgSPGLVfbL2nF1gakBsh6633VnsUu-tJXTI4k65XSaY";
const url = "https://adesgdemtdfbqbidzeeu.supabase.co";

const supa = supabase.createClient(url, key);

const registerForm = document.getElementById("register-form");

const modalBtn = document.getElementById("modal-btn");
const regModal = document.getElementById("register-modal");

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

  if (data.length > 0) {
    h2.innerHTML = "Email already in use. Try again!";
  } else {
    const { error } = await supa.from("users").insert({
      // id: await supa.from('users').select().max("id") + 1,
      username: e.target.username.value,
      email: e.target.email.value,
      birthdate: new Date(e.target.birthday.value),
    });
    console.log(error);
    if (error) {
      h2.innerHTML = "Something went wrong. Try again!";
    } else {
      h2.innerHTML = "Registration complete! your ID is ";
    }
  }
  regModal.style.display = "flex";
});
