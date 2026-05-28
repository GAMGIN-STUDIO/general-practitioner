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