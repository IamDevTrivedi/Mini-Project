console.log('The Script is started......');

const input_description = document.querySelector('#input-description');
const input_trigger = document.querySelector('#input-trigger');
const input_usercode = document.querySelector('#input-usercode');
const output_code = document.querySelector('#output-code');
const copy_button = document.querySelector('#copy-button');


const generateSnippetObject = (prefix, body, description, language) => {
    return {
        [prefix]: {
            prefix: prefix,
            body: body.split('\n'),
            description: description,
            scope: language
        }
    };
};


function updateOutput() {
    const description = input_description.value.trim();
    const trigger = input_trigger.value.trim();
    const usercode = input_usercode.value.trim();
    const language = `source.${trigger.toLowerCase()}`;

    const snippetObject = generateSnippetObject(trigger, usercode, description, language);


    output_code.value = JSON.stringify(snippetObject, null, 4);
}

function copyToClipboard() {
    output_code.select();
    document.execCommand('copy');

    copy_button.innerText = 'Copied !';
    copy_button.classList.add("font-extrabold");
    copy_button.classList.remove("font-bold");

    setTimeout(() => {
        copy_button.innerText = 'Copy';
        copy_button.classList.remove("font-extrabold");
        copy_button.classList.add("font-bold");
    }, 3000);
}


input_description.addEventListener("input", updateOutput);
input_trigger.addEventListener("input", updateOutput);
input_usercode.addEventListener("input", updateOutput);


copy_button.addEventListener('click', copyToClipboard);
output_code.addEventListener("click", copyToClipboard);


updateOutput();
