const products = {
  strings: {
    violin: {
      description:
        "A bowed stringed instrument having four strings tuned at intervals of a fifth and a usual range from G below middle C upward for more than 4¹/₂ octaves and having a shallow body, shoulders at right angles to the neck, a fingerboard without frets, and a curved bridge.",
      price: 500.0,
      num_in_stock: 8,
    },
    viola: {
      description:
        "A stringed musical instrument, the tenor of the violin family. It is built in proportions similar to those of the violin but has a body length of 37 to 43 cm (14.5 to 17 inches), about 5 cm (2 inches) longer than a violin. Its four strings are tuned c–g–d′–a′, beginning with the C below middle C.",
      price: 400.0,
      num_in_stock: 9,
    },
    cello: {
      description:
        "a musical instrument with four strings that looks like a large violin. You play the cello with a bow while sitting down and holding it upright between your legs.",
      price: 450.0,
      num_in_stock: 7,
    },
    doublebass: {
      description:
        "The largest and lowest-pitched bowed string instrument in the modern symphony orchestra. The Double bass has a similar structure to the cello.",
      price: 600.0,
      num_in_stock: 3,
    },
  },
  woodwind: {
    flute: {
      description:
        "A woodwind instrument, generally of a tubular shape, that is played by blowing across a specially-shaped opening (known as the embouchure) in such a way as to produce a vibrating column of air whose pulsations we hear as sound",
      price: 300.0,
      num_in_stock: 11,
    },
    oboe: {
      description:
        "A double-reed woodwind instrument having a conical tube, a brilliant penetrating tone, and a usual range from B flat below middle C upward for over 2¹/₂ octaves.",
      price: 450.0,
      num_in_stock: 8,
    },
    recorder: {
      description:
        "A wind instrument of the fipple, or whistle, flute class, closely related to the flageolet.",
      price: 60.0,
      num_in_stock: 20,
    },
    clarinet: {
      description:
        "It has a single-reed mouthpiece, a straight, cylindrical tube with an almost cylindrical bore, and a flared bell.",
      price: 250.0,
      num_in_stock: 4,
    },
    saxophone: {
      description:
        "A type of single-reed woodwind instrument with a conical body, usually made of brass. As with all single-reed instruments, sound is produced when a cane reed on a mouthpiece vibrates to produce a sound wave inside the instrument's body.",
      price: 300.0,
      num_in_stock: 3,
    },
    bassoon: {
      description:
        "A double-reed woodwind instrument having a long U-shaped conical tube connected to the mouthpiece by a thin metal tube and a usual range two octaves lower than that of the oboe.",
      price: 500.0,
      num_in_stock: 6,
    },
  },
  brass: {
    trumpet: {
      description:
        "A wind instrument consisting of a conical or cylindrical usually metal tube, a cup-shaped mouthpiece, and a flared bell specifically : a valved brass instrument having a cylindrical tube with two turns and a usual range from F sharp below middle C upward for 2¹/₂ octaves.",
      price: 300.0,
      num_in_stock: 9,
    },
    trombone: {
      description:
        "A brass instrument consisting of a long cylindrical metal tube with two turns and having a movable slide or valves for varying the tone and a usual range one octave lower than that of the trumpet.",
      price: 200.0,
      num_in_stock: 5,
    },
    "french horn": {
      description:
        "A circular valved brass instrument having a conical bore, a funnel-shaped mouthpiece, and a usual range from B below the bass staff upward for more than three octaves.",
      price: 500.0,
      num_in_stock: 6,
    },
    euphonium: {
      description:
        "A brass wind instrument with valves, pitched in C or B♭ an octave below the trumpet; it is the leading instrument in the tenor-bass range in military bands.",
      price: 350.0,
      num_in_stock: 2,
    },
    tuba: {
      description:
        "A large low-pitched brass instrument usually oval in shape and having a conical tube, a cup-shaped mouthpiece, and a usual range an octave lower than that of the euphonium.",
      price: 600.0,
      num_in_stock: 2,
    },
  },
  accessories: {
    "music stand": {
      description: "A stand to hold your precious sheet music!",
      price: 15.5,
      num_in_stock: 20,
    },
    metronome: {
      description: "Keeps you in time with the click-click.",
      price: 20.4,
      num_in_stock: 13,
    },
    tuner: {
      description: "Stops you sounding quite so terrible.",
      price: 20.8,
      num_in_stock: 10,
    },
  },
};

module.exports = products;
