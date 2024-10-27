let alarmTimeout;

// Function to set the alarm
function setAlarm() {
    const alarmTime = document.getElementById("alarmTime").value;
    if (alarmTime) {
        alert(`Alarm set for ${alarmTime}`);

        // Clear any existing alarm
        if (alarmTimeout) clearInterval(alarmTimeout);

        // Start checking the time every second
        alarmTimeout = setInterval(() => {
            const currentTime = new Date();
            const formattedTime = `${String(currentTime.getHours()).padStart(2, '0')}:${String(currentTime.getMinutes()).padStart(2, '0')}:${String(currentTime.getSeconds()).padStart(2, '0')}`;

            if (formattedTime === alarmTime) {
                clearInterval(alarmTimeout); // Stop checking after alarm triggers
                alert("🔔 Time's up! Alarm ringing!");
                playAlarmSound();
            }
        }, 1000);
    }
}

// Optional: Function to play a sound when the alarm goes off
function playAlarmSound() {
    const audio = new Audio('path_to_your_alarm_sound.mp3'); // Replace with actual path to sound file
    audio.play();
}

// Function to make eyes blink periodically
function startBlinking() {
    const eyes = document.querySelectorAll('.eye');

    setInterval(() => {
        eyes.forEach(eye => {
            eye.style.animation = 'blink 0.3s ease-in-out';

            // Remove the animation after it's completed
            setTimeout(() => {
                eye.style.animation = '';
            }, 300);
        });
    }, Math.random() * 4000 + 2000); // Random interval between 2-6 seconds
}

// Start blinking when page loads
startBlinking();

// JavaScript for Pupil Movement
document.addEventListener('mousemove', (e) => {
    const eyes = document.querySelectorAll('.eye');

    eyes.forEach(eye => {
        const pupil = eye.querySelector('.pupil');
        const rect = eye.getBoundingClientRect();

        // Eye center coordinates
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;

        // Calculate the angle to the cursor
        const angle = Math.atan2(e.pageX - eyeX, e.pageY - eyeY);

        // Limit pupil movement within the eye
        const pupilX = Math.cos(angle) * 12;
        const pupilY = Math.sin(angle) * 12;

        pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
    });
});

// Function to show current time with hour:minute:second AM/PM format and greeting
function updateTime() {
    const timeElement = document.getElementById("currentTime");

    setInterval(() => {
        const now = new Date();
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';

        // Convert to 12-hour format
        hours = hours % 12 || 12;
        timeElement.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;

        // Set greeting text
        setGreeting(now.getHours());
    }, 1000);
}

// Function to set greeting based on the time of day
function setGreeting(hour) {
    const memoText = document.getElementById("memoText");
    let greeting;

    if (hour >= 5 && hour < 12) {
        greeting = "Good Morning!";
    } else if (hour >= 12 && hour < 17) {
        greeting = "Good Afternoon!";
    } else if (hour >= 17 && hour < 21) {
        greeting = "Good Evening!";
    } else {
        greeting = "Good Night!";
    }

    memoText.textContent = greeting;
}

// Start displaying the time and greeting when the page loads
updateTime();