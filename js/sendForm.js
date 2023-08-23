const forms = document.querySelectorAll('form')

const sendForm = ({
  formId
}) => {
  const form = formId;
  const policy = document.querySelector('.policy')
  const statusBlock = document.createElement('div');
  const statusLoad = document.createElement('div');
  const loadText = "Loanding..."
  const errorText = "Please fill in all required fields"
  const success = document.querySelector('.modal-success')
  const timer = (input) => {
    setTimeout(() => {
      statusBlock.remove();
    }, 5000)
  }


  const validate = (list) => {
    let success = true
    list.forEach((input) => {
      const statusError = document.createElement('p');
      statusError.textContent = 'This field is required.'
      statusError.style = 'color: var(--additional-02, #EC1211); font-size: 12px; font-style: normal;  font-weight: 400;  line-height: 20px'
      statusError.className = 'statusError'
      if (
        ((input.name === "name") && (input.value.length < 1)) 
        ||
        ((input.name === "email") && (input.value.length < 1))
         ||
        ((input.name === "phone") && (input.value.length < 1))
      ) {
        if(document.querySelectorAll('.statusError').length != 3){
          input.after(statusError)
        }
        input.style.border = "1px solid red";
        setTimeout(() => {
          input.style.border = " 1px solid #dfdfdf"
          statusError.remove()
        }, 5000)
        success = false
      }
    })
    return success
  }

  
const sendData = (data) => {
  return fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
}

  const submitForm = () => {
    const formElements = form.querySelectorAll('[type=text] , [type=email], [type=tel]')

    const formBody = {}
    statusBlock.style = 'padding: 10px 0; color: var(--additional-02, #EC1211); font-size: 16px; font-style: normal; font-weight: 400; line-height: normal;'

    statusBlock.textContent = loadText

    policy.before(statusBlock)
    formElements.forEach((val) => {
      if (val.value != '') {
      formBody[val.name] = val.value
      }
    })

    if (validate(formElements)) {
      sendData(formBody).then(data => {
          statusLoad.remove()
          formElements.forEach(input => {
            input.value = "";
          })
          success.classList.toggle("success")
          form.classList.toggle("success")
        })
        .catch(error => {
          statusBlock.textContent = errorText
        })
    } else {
      statusLoad.remove()

      statusBlock.textContent = errorText
    }
    timer()
  }

  try {
    if (!form) {
      throw new Error('Error')
    }
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      submitForm();
    })
  } catch (error) {
    console.log(error.message)
  }


}

forms.forEach((e) => {
  sendForm({
    formId: e
  });
})

