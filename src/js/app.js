const serviceSummary = document.querySelectorAll('.service-summary');
serviceSummary.forEach(summary => {
	summary.addEventListener('click', (e) => {
		e.preventDefault();
	})
})

const serviceItems = document.querySelectorAll('.service-item');
serviceItems.forEach(item => {
	item.addEventListener('click', () => {
		const itemChildren = Array.from(item.children);
		itemChildren.forEach(child => {
			if(child.tagName === 'DETAILS'){
				child.open = !child.open;
			}else if(child.classList.contains('icon')) {
				child.classList.toggle('active');
			}
			const summary = Array.from(child.children).find(el => el.tagName === 'SUMMARY');
			if(summary instanceof HTMLElement) {
				summary.classList.toggle('active');
			}
		})
		item.classList.toggle('active');
	});
})

const imageHrefs = document.querySelectorAll('section#gallery .gallery-box a');
let flag = 0;
imageHrefs.forEach(node => {
	flag++;
	if(flag === 1 || flag === 2) {
		node.classList.add('top-line');
	}else if(flag === 3 || flag === 4){
		node.classList.add('bottom-line');
	}
	if(flag === 4) {
		flag = 0;
	}
	
});

const faqHeaders = document.querySelectorAll('#faq-header');
faqHeaders.forEach(faqHeader => {
	faqHeader.addEventListener('click', () => {
		faqHeader.classList.toggle('selected');
	});
});


const checkbox = document.querySelector('#privacy-policy');
checkbox.addEventListener('change', () => {
	const details = document.querySelector('#text-conditions');
	if(checkbox.checked === true) {
		details.open = true;
	}else {
		details.open = false;
	}
});

const formIButton = document.querySelector('[name=appointment-button]');
const fullName = document.querySelector('#full-name');
const birthYear = document.querySelector('#birth-year');
const subject = document.querySelector('#subject');
const message = document.querySelector('#message');

const formElements = document.querySelectorAll('[name=formIcheck]');
formElements.forEach(element => {
	element.addEventListener('input', () => {
		const formValidity = document.querySelector('#appointment-form').checkValidity();
		if(formValidity) {
			formIButton.classList.add('active');
		}else {
			formIButton.classList.remove('active');
		}
	});
});

formIButton.addEventListener('click', (e) => {
	e.preventDefault();

	const form = document.querySelector('#appointment-form');
	const formValidity = form.reportValidity();

	if(formValidity){
		const fullNameValue = encodeURIComponent(`[name=${fullName.value.toUpperCase()}]`);
		const birthYearValue = encodeURIComponent(`[birth-year=${birthYear.value.replace(/\D/g, '')}]`);
		const subjectValue = encodeURIComponent(subject.value.toUpperCase());
		const messageValue = encodeURIComponent(message.value);
		const email = encodeURIComponent('lekar.valticka@gmail.com');
		const br = encodeURIComponent('\n');

		window.location.href = `mailto:${email}?subject=${subjectValue}&body=${messageValue}${br+br}${fullNameValue}${br}${birthYearValue}`;
		
		fullName.value = '';
		birthYear.value = '';
		subject.value = '';
		message.value = '';

		fullName.classList.remove('allow-report');
		birthYear.classList.remove('allow-report');
		subject.classList.remove('allow-report');
		message.classList.remove('allow-report');

		formIButton.classList.add('passed');
		form.classList.add('passed');

		setTimeout(() => {
			formIButton.classList.remove('passed');
			form.classList.remove('passed');
			formIButton.classList.remove('active');
		}, 2000);

	}else{
		fullName.classList.add('allow-report');
		birthYear.classList.add('allow-report');
		subject.classList.add('allow-report');
		message.classList.add('allow-report');
	}


});