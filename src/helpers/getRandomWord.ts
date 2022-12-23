let words: string[] = [
    'COMPUTADORA',
    'AGUACATE',
    'FRIGORIFICO',
    'MURCIELAGO',
    'PAPAYA',
    'VETERINARIO',
    'FARMACEUTICO',
    'LEGISLACION',
    'DIGITAL',
    'VEHICULO',
    'MERMELADA',
    'MADRID',
    'TELEFONO'
];

export function getRandomWord () {

   const randomIndex =  Math.floor(Math.random() * words.length);

    return words[randomIndex];
}