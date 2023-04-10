const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkZXNnZGVtdGRmYnFiaWR6ZWV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEwMzY4OTgsImV4cCI6MTk5NjYxMjg5OH0.CgSPGLVfbL2nF1gakBsh6633VnsUu-tJXTI4k65XSaY";
const url = "https://adesgdemtdfbqbidzeeu.supabase.co";

const supa = supabase.createClient(url, key);

const registerForm = document.getElementById("register-form");

const modalBtn = document.getElementById("modal-btn");
const regModal = document.getElementById("register-modal");

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateDateOfBirth(year, month, day) {
  const numYear = Number(year);
  const numMonth = Number(month);
  const numDay = Number(day);

  const date = new Date(numYear, numMonth - 1, numDay);
  return date.getFullYear() === numYear && date.getMonth() === numMonth - 1 && date.getDate() === numDay;
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
    e.target.year.value === "" ||
    e.target.month.value === "" ||
    e.target.day.value === ""
  ) {
    h2.innerHTML = "Please fill in all the fields!";
  } else if (!validateEmail(e.target.email.value)) {
    h2.innerHTML = "Please enter a valid email!";
  } else if (!validateDateOfBirth(e.target.year.value, e.target.month.value, e.target.day.value)) {
    h2.innerHTML = "Please enter a valid date of birth!";
  } else if (data.length > 0) {
    h2.innerHTML = "Email already in use. Try again!";
  } else {
    const { data, count } = await supa
      .from('users')
      .select('*', { count: 'exact' })
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
