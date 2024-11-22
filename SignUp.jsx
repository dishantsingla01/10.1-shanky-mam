import React, { useState } from 'react';

function Form() {
    const [email, setEmail] = useState(''); // To store the email input
    const [message, setMessage] = useState(''); // To display success or error messages

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            // Send the email to the backend
            const response = await fetch('http://localhost:3000/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message); // Show success message
                setEmail(''); // Clear the email field
            } else {
                setMessage(data.message || 'An error occurred'); // Show error message
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Failed to subscribe. Please try again.'); // Handle fetch error
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="form-signup">
                <label htmlFor="email">SIGN UP FOR OUR DAILY INSIDER</label>
                <input
                    type="email"
                    id="email"
                    className="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Update state on input change
                    required
                />
                <button type="submit">Subscribe</button>
            </form>
            {message && <p>{message}</p>} {/* Display success or error message */}
        </div>
    );
}

export default Form;
