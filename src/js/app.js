/* safari, firefox detection */
const ua = navigator.userAgent;

const isSafari =
	ua.includes("Safari") && /* safari */
	!ua.includes("Chrome") &&
	!ua.includes("Chromium") &&
	!ua.includes("CriOS") &&
	!ua.includes("Firefox") &&
	!ua.includes("Edg") &&
	!ua.includes("OPiOS");

if (isSafari) {
	document.documentElement.classList.add("safari");
}

const isFirefox =
	!ua.includes("Safari") &&
	!ua.includes("Chrome") &&
	!ua.includes("Chromium") &&
	!ua.includes("CriOS") &&
	ua.includes("Firefox") && /* firefox */
	!ua.includes("Edg") &&
	!ua.includes("OPiOS");

if(isFirefox) {
	document.documentElement.classList.add('firefox');
}
/* END - safari, firefox detection  */


/* eliminate summary functionality and replace it by click on whole bullet point - reason is larger click area */
const servicesSummary = document.querySelectorAll('.service-summary');
servicesSummary.forEach(summary => {
	summary.addEventListener('click', (e) => {
		e.preventDefault();
	})
})

const serviceItems = document.querySelectorAll('.service-item');
serviceItems.forEach(item => {
	item.addEventListener('click', (e) => {
		if(e.target.classList.contains('gallery-box') || e.target.id === "non-li") {
			return;
		}
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
/* END - eliminate summary functionality */

/* moving effect on images in gallery */
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
/* END - moving effect on images in gallery */


/* faq different style after click  */
const faqHeaders = document.querySelectorAll('#faq-header');
faqHeaders.forEach(faqHeader => {
	faqHeader.addEventListener('click', () => {
		faqHeader.classList.toggle('selected');
	});
});
/* END - faq different style after click  */

/* privacy policy conditions open/close after agree/disagree for alert user if he/she didn't read it */
const checkbox = document.querySelector('#privacy-policy');
checkbox.addEventListener('change', () => {
	const details = document.querySelector('#text-conditions');
	if(checkbox.checked === true) {
		details.open = true;
	}else {
		details.open = false;
	}
});
/* END - pivacy policy conditions click functionality */

/* form functionality */
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

		const isTouchOnly = window.matchMedia("(pointer: coarse)").matches && !window.matchMedia("(hover: hover)").matches;
		window.location.href = `mailto:${email}?subject=${subjectValue}&body=${messageValue}${br+br}${fullNameValue}${br}${birthYearValue}`;
		if(isTouchOnly){
			location.reload(); // much earlier for phones, it's better
		}
		
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

			location.reload();
		}, 1000);

	}else{
		fullName.classList.add('allow-report');
		birthYear.classList.add('allow-report');
		subject.classList.add('allow-report');
		message.classList.add('allow-report');
	}
	/* END - form functionality */

});