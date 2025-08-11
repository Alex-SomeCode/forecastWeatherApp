export const cardLocationTemplate = `
    <div name="cardLocation">
        <p>
        <span name='country'>{{country}}: </span>
        <span name="name">{{name}},</span>
        <span name="lat">lat: {{lat}};</span>
        <span name="lon">lon: {{lon}};</span>
        </p>
        <button name='add'>add to forecast</button>
        <button name='rem'>remove from forecast</button>
        <button name='del'>delete</button>
    </div>
   `;
