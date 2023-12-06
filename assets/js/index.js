(function () {

  const steps = [
    {
      heading: "Personal info",
      hint: "Please provide your name, email address, and phone number.",
      data: [
        ["Name", "e.g. Stephen King", "text"],
        ["Email Address", "e.g. stephenking@lorem.com", "email"],
        ["Phone Number", "e.g. +1 234 567 890", "tel"]
      ]},
    {
      heading: "Select your plan",
      hint: "You have the option of monthly or yearly billing.",
      data: [
        ["Arcade", 9, "icon-arcade.svg"],
        ["Advanced", 12, "icon-advanced.svg"],
        ["Pro", 15, "icon-pro.svg"]
      ]},
    {
      heading: "Pick add-ons",
      hint: "Add-ons help enhance your gaming experience.",
      data: [
        ["Online service", "Access to multiplayer games", 1],
        ["Larger storage", "Extra 1TB of cloud save", 2],
        ["Customizable Profile", "Custom theme on your profile", 2]
      ]},
    {
      heading: "Finishing up",
      hint: "Double-check everything looks OK before confirming."},
    {
      heading: "Thank you!",
      hint: "Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com."}
    ],
    step = document.querySelectorAll(".step"),
    form = document.getElementById("form"),
    back = document.getElementById("back"),
    next = document.getElementById("next");


  function hints (step) {
    const heading = document.getElementById("heading"),
      hint = document.getElementById("hint");

    heading.innerHTML = step.heading;
    hint.innerHTML = step.hint;
  }

  function htmlForm(text) {


    form.innerHTML = text;

  }

  let currentStep = 0,
  step1_allow = {
    name: false,
    email: false,
    phone: false
  },
  plan = steps[1].data[0][0],
  interval = "mo",
  planPricing = steps[1].data[0][1];

  function step1 () {
    const data = steps[0].data;
    let text = "";

    for (let v in data) {
      const input = data[v];

      text = `${text}<div class="input_box">
        <div class="line space-between">
          <label for="input${v}">${input[0]}</label>
          <span class="error">This field is required</span>
        </div>
        <input type="${input[2]}" id="${Object.keys(step1_allow)[v]}" placeholder="${input[1]}" value="${Object.values(step1_allow)[v] != false ? Object.values(step1_allow)[v] : ""}" class="input">
      </div>`;

      htmlForm(text);

    }

  }

  function check () {
    let inputs = document.querySelectorAll(".input");

    inputs.forEach(input => {
      const ID = input.id;
      let value = input.value;

      step1_allow[ID] = value;

      if (value.trim() != "") {

        input.parentElement.classList.remove("xError");

      } else {
        input.parentElement.classList.add("xError");
      }

    });

    if (Object.values(step1_allow).every(value => value != false && value != undefined && value != "")) return true;

  }

  function chosenPlan () {
    plan = this.id;
    planPricing = parseInt(this.dataset.pricing);
    document.querySelectorAll(".plan-box").forEach(el => el.classList.remove("active"));
    this.classList.add("active");
  }

  function intervalbtn() {

    const yearly = this.getAttribute("aria-label").replace("Monthly", "Yearly"),
      monthly = this.getAttribute("aria-label").replace("Yearly", "Monthly");
      let i = 0;

    if (interval == "mo") {
      this.setAttribute("aria-label", yearly);

      document.querySelectorAll(".pricing").forEach(el => {
        el.innerHTML = `$${steps[1].data[i++][1] * 10}/yr`
      });
      i = 0;
      document.querySelectorAll(".plan-box ").forEach(el => {

        el.setAttribute("data-pricing", `${steps[1].data[i++][1] * 10}`);

      });

    } else {
      this.setAttribute("aria-label", monthly);
      i = 0;
      document.querySelectorAll(".pricing").forEach(el => el.innerHTML = `${steps[1].data[i++][1]}/mo`);
      i = 0;
      document.querySelectorAll(".pricing").forEach(el => {
        el.innerHTML = `$${steps[1].data[i++][1]}/mo`
      });
      i = 0;
      document.querySelectorAll(".plan-box ").forEach(el => {

        el.setAttribute("data-pricing", `${steps[1].data[i++][1]}`);

      });
    }

    document.querySelectorAll("#intervalBtn .interval").forEach(span => {

      span.classList.toggle("active");

    });

    document.querySelector("#intervalBtn .check").classList.toggle("yearly");
    
    document.querySelectorAll(".discount").forEach(el => {
      el.classList.toggle("hidden");
    });

    interval = interval == "mo" ? "yr" : "mo"; 

    for(i in steps[1].data) {

      if (steps[1].data[i].includes(plan)) {
        planPricing = interval == "mo" ? steps[1].data[i][1] : steps[1].data[i][1] * 10;
        break;
      }

    }

    pageHegiht()

  }

   function step2 () {
    const data = steps[1].data;
    let text = "";

    for (let radio in steps[1].data) {

      text = `${text}<button class="plan-box line laptop:block" data-pricing="${interval == "mo" ? `${data[radio][1]}` : `${data[radio][1] * 10}`}" id="${data[radio][0]}" aria-label="Plan${data[radio][0]}">
          <img src="assets/images/${data[radio][2]}" alt="${data[radio][0]} Logo">
          <span>
            <h2 class="plan-name">${data[radio][0]}</h2>
            <p class="gray pricing">${interval == "mo" ? `$${data[radio][1]}/mo` : `$${data[radio][1] * 10}/yr`}</p>
            <p class="${interval == "mo" ? "hidden" : ""} gray black discount">2 months free</p>
          </span>
      </button>`;

    }

    htmlForm(`<div class="laptop:line space-between">${text}</div>
    <div class="line interval-box">
      <button type="type" class="line" id="intervalBtn" aria-label="plan interval (${interval == "mo" ? "Monthly" : "Yearly"})">
        <span class="interval monthly ${interval == "mo" ? "active" : ""}">Monthly</span>
        <span class="check ${interval == "yr" ? "yearly" : ""}"></span>
        <span class="interval ${interval == "yr" ? "active" : ""}">Yearly</span>
      </button>
    </div>`);

    document.querySelectorAll(".plan-box").forEach(radio => {

      radio.addEventListener("click", chosenPlan);

    });

    document.getElementById(plan).click();
    document.getElementById("intervalBtn").addEventListener("click", intervalbtn);

  }

  let addons = {
    online: true,
    storage: true,
    cust: false
  }

  function step3 () {
    let text = "";
    const addonsNames = Object.keys(addons);

    for (i in steps[2].data) {

      text = `${text}
      <div class="addon-box">
        <input type="checkbox" name="${addonsNames[i]}" id="${addonsNames[i]}" class="addon" ${addons[addonsNames[i]] ? "checked" : ""} tabindex="-1">
        <label for="${addonsNames[i]}" class="addon-label line space-between ${addons[addonsNames[i]] ? "active" : ""}" tabindex="0">
          <div>
            <h2 class="addon-name">${steps[2].data[i][0]}</h2>
            <p class="gray addon-hint">${steps[2].data[i][1]}</p>
          </div>
          <p class="addon-pricing gray">${interval == "mo" ? `+$${steps[2].data[i][2]}/mo` : `+$${steps[2].data[i][2] * 10}/yr`}</p>
        </label>
      </div>`;

    }

    htmlForm(`<div class="addons">${text}</div>`);

    document.querySelectorAll(".addon").forEach(add => add.addEventListener("click", function () {
      addons[this.id] = addons[this.id] ? false : true;
      this.nextElementSibling.classList.toggle("active");
    }));
    document.querySelectorAll(".addon-label").forEach(add => add.addEventListener("keydown", function (e) {
      if (e.key == " " || e.key == "Enter") this.previousElementSibling.click();
    }));

  }
  function step4 () {

    let text = `<div class="your-plan line space-between">
      <div>
        <h2 class="marine">${plan} (${interval == "mo" ? "Monthly" : "Yearly"})</h2>
        <button type="button" id="change">Change</button>
      </div>
      <p><strong class="gray black em1 marine">$${planPricing}/${interval}</strong></p>
    </div>
    <div class="your-addons">`;

    let result = planPricing;

    for (key in Object.keys(addons)) {

      if (addons[Object.keys(addons)[key]]) {
        text += `<div class="lh2 line space-between">
        <p class="gray em1">${steps[2].data[key][0]}</p>
        <p class="gray marine">+$${interval == "mo" ? `${steps[2].data[key][2]}` : `${steps[2].data[key][2] * 10}`}/${interval}</p>
        </div>`;
        result += interval == "mo" ? steps[2].data[key][2] : steps[2].data[key][2] * 10;
      }
    }
    text += `</div>
    <div class="total line space-between">
      <p class="gray em1">Total (per ${interval == "mo" ? "month" : "year"})</p>
      <p class="total-pricing"><strong>+$${result}/${interval}</strong></p>
    </div>`;

    htmlForm(`<div class="summary">${text}</div>`);

    document.getElementById("change").addEventListener("click", _ => {
      currentStep = 1;
      action(steps[currentStep]);
    });

  }
  function step5 () {
    let effect = document.querySelector(".effect");
    let thanks = document.createElement("img");
    thanks.src = "assets/images/icon-thank-you.svg";
    thanks.classList.add("thanks")
    thanks.alt = "Thanks Logo";
    
    form.style.marginTop = "0";
    effect.classList.add("line");

    effect.style.flexDirection = "column";
    effect.style.textAlign = "center";

    step.forEach(s => {
      s.setAttribute("aria-expanded", false);
      s.setAttribute("disabled", "");
    })

    effect.prepend(thanks);

    htmlForm("");
  }

  function submit () {

    if (steps.length - 1 > currentStep && check()) action(steps[++currentStep]);

  }

  function goBack () {

    if (currentStep > 0) action(steps[--currentStep]);
    
  }

  function show (step) {

    const index = steps.indexOf(step);
    
    hints(step);

    switch (index) {
      case 1:
        step2();
        break;
      case 2:
        step3();
        break;
      case 3:
        step4();
        break;
      case 4:
        step5();
        break;
      case 0:
      default:
        step1();
        break;
    }

    pageHegiht();

  }

  function action (step) {
    const effect = document.querySelector(".effect");

    effect.classList.add("action");

    setTimeout(function () {
      show(step);
    }, 500);

    setTimeout(function () {
      effect.classList.remove("action");
    }, 1000);
    
    if (currentStep > 0) {
      back.classList.remove("hidden");
      back.removeAttribute("disabled");
    } else {
      back.classList.add("hidden");
      back.setAttribute("disabled", "");
    }
    
    if (currentStep == 3) {
      next.innerHTML = "Confirm";
      next.classList.add("confirm");
    } else {
      next.innerHTML = "Next Step";
      next.classList.remove("confirm");
    }
    
    if (currentStep == 4) next.parentElement.classList.add("hidden");
    
    if (currentStep < 4) stepActive(currentStep);

  }

  function stepActive (num = 0) {

  step.forEach(el => {
    el.classList.remove("active");
    el.ariaExpanded = false;
  });

  step[num].classList.add("active");
  step[num].removeAttribute("disabled");
  step[num].ariaExpanded = true;

  }

  function pageHegiht() {
    const windowHeight = window.innerHeight,
      data = document.querySelector(".data").clientHeight,
      controls = document.querySelector(".controls").clientHeight,
      height = document.querySelector(".height");

      if (window.matchMedia("(max-width: 991px)").matches) {

        
        if (windowHeight < data + controls + (windowHeight * 0.109445277) + 19) {
          height.style.minHeight = data + controls + (windowHeight * 0.109445277) + 50 + "px";
        } else {
          height.style.minHeight = "100vmin";
        }

      }

  }

  function main () {

    back.addEventListener("click", goBack);
    next.addEventListener("click", submit);

    action(steps[currentStep]);

    for (let i in step) {

      step[i].onclick = function () {
        if (check()) {

          step.forEach(el => el.classList.remove("active"));
          
          this.classList.add("active");
          
          action(steps[i]);
        }

      };

    }

    window.addEventListener("resize", pageHegiht);
    window.addEventListener("load", pageHegiht);
    
  }

  main();
    
})();
