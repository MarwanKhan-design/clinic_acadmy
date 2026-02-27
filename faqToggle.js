// FAQ Toggle Functionality - Debug Version with Console Logs
console.log('FAQ Debug script loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    
    // Select all FAQ items
    const faqItems = document.querySelectorAll('.faq-item');
    console.log('Found FAQ items:', faqItems.length);
    
    if (faqItems.length === 0) {
        console.warn('No .faq-item elements found on the page!');
        console.log('Checking if elements exist with different selector...');
        
        // Try alternative selectors
        const altItems = document.querySelectorAll('[class*="faq-item"]');
        console.log('Alternative selector found:', altItems.length);
        
        const faqQuestions = document.querySelectorAll('.faq-question');
        console.log('FAQ questions found:', faqQuestions.length);
    }
    
    // Add click event to each FAQ question
    faqItems.forEach((item, index) => {
        console.log(`Setting up FAQ item ${index + 1}`);
        
        const question = item.querySelector('.faq-question');
        
        if (!question) {
            console.error(`FAQ item ${index + 1} has no .faq-question element!`);
            console.log('Item HTML:', item.outerHTML.substring(0, 200) + '...');
            return;
        }
        
        console.log(`FAQ item ${index + 1} question found:`, question.textContent.substring(0, 30) + '...');
        
        // Remove any existing listeners first (to prevent duplicates)
        question.removeEventListener('click', handleFaqClick);
        
        // Add click event
        question.addEventListener('click', handleFaqClick);
        
        // Add keyboard support
        question.addEventListener('keydown', function(e) {
            console.log('Key pressed on FAQ:', e.key);
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                console.log('Enter/Space pressed - toggling FAQ');
                this.click();
            }
        });
        
        // Make questions focusable for keyboard users
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');
    });
    
    // Function to handle FAQ click
    function handleFaqClick(e) {
        console.log('FAQ CLICKED!', e.currentTarget);
        
        // Prevent event bubbling
        e.stopPropagation();
        
        // Get the parent faq-item
        const faqItem = e.currentTarget.closest('.faq-item');
        
        if (!faqItem) {
            console.error('Could not find parent .faq-item!');
            return;
        }
        
        console.log('FAQ item found:', faqItem);
        console.log('Current active state:', faqItem.classList.contains('active'));
        
        // Toggle the active class
        faqItem.classList.toggle('active');
        
        console.log('New active state:', faqItem.classList.contains('active'));
        
        // Update ARIA attribute
        const isActive = faqItem.classList.contains('active');
        e.currentTarget.setAttribute('aria-expanded', isActive);
        
        // Log the answer visibility
        const answer = faqItem.querySelector('.faq-answer');
        if (answer) {
            console.log('Answer height:', answer.offsetHeight);
            console.log('Answer max-height style:', window.getComputedStyle(answer).maxHeight);
        }
    }
    
    // If no items found with the above method, try direct delegation
    if (faqItems.length === 0) {
        console.log('Setting up document-level event delegation');
        
        document.addEventListener('click', function(e) {
            const question = e.target.closest('.faq-question');
            
            if (question) {
                console.log('FAQ question clicked (via delegation):', question);
                
                const faqItem = question.closest('.faq-item');
                
                if (faqItem) {
                    console.log('Toggling FAQ via delegation');
                    faqItem.classList.toggle('active');
                    
                    const isActive = faqItem.classList.contains('active');
                    question.setAttribute('aria-expanded', isActive);
                }
            }
        });
    }
});

// Also try when window loads (in case DOMContentLoaded fires too early)
window.addEventListener('load', function() {
    console.log('Window loaded - checking FAQ items again');
    
    const faqItems = document.querySelectorAll('.faq-item');
    console.log('FAQ items on window load:', faqItems.length);
    
    if (faqItems.length > 0) {
        console.log('FAQ items found on window load - checking if they have listeners');
        
        faqItems.forEach((item, index) => {
            const question = item.querySelector('.faq-question');
            if (question) {
                console.log(`FAQ ${index + 1} question:`, question.textContent.substring(0, 30) + '...');
                console.log('Has click listeners?', question._listeners ? 'Yes' : 'Unknown');
            }
        });
    }
});

// Simple test function to check if events are working
function testFaqManually(index) {
    console.log('Manual test - toggling FAQ at index', index);
    
    const items = document.querySelectorAll('.faq-item');
    
    if (items.length > index) {
        items[index].classList.toggle('active');
        console.log('Toggled, active now:', items[index].classList.contains('active'));
    } else {
        console.error('FAQ item at index', index, 'not found');
    }
}

console.log('Debug functions available: testFaqManually(index)');