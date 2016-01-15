exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('posts').del(),

    // Inserts seed entries
    knex('posts')
      .insert({
        topic_id: 1,
        title: 'OOP In JavaScript: What You NEED to Know',
        body: 'Object Oriented Programming (OOP) refers to using self-contained pieces of code to develop applications. We call these self-contained pieces of code objects, better known as Classes in most OOP programming languages and Functions in JavaScript. We use objects as building blocks for our applications. Building applications with objects allows us to adopt some valuable techniques, namely, Inheritance (objects can inherit features from other objects), Polymorphism (objects can share the same interface—how they are accessed and used—while their underlying implementation of the interface may differ), and Encapsulation (each object is responsible for specific tasks).',
        rating: 0
      }),
      knex('posts')
      .insert({
        topic_id: 2,
        title: 'Featured: Pietro Perugino from the National Gallery',
        body: "Pietro Vanucci was born in Città della Pieve and was called Perugino after the town of Perugia, where he worked. As a professional painter and the overseer of two or more workshops consecutively, Perugino had great and international success. Raphael worked with him in Perugia in about 1500. The Gallery's fragments 'The Virgin and Child and Saints Michael and Raphael' were part of an altarpiece for the Charterhouse of Pavia. In 1480-2 he was in charge of the wall decoration of the Sistine Chapel, Rome.",
        rating: 0
      }),
      knex('posts')
      .insert({
        topic_id: 3,
        title: 'Tame Impala, Mac DeMarco to play joint Red Rocks show in August',
        body: "Modern psych-rock torchbearers Tame Impala have announced a handful of big-venue U.S. shows in late-summer 2016, including a date at Morrison, Colorado's Red Rocks Amphitheatre. The show is set for August 31.",
        rating: 0
      }),
      knex('posts')
      .insert({
        topic_id: 4,
        title: 'Roy skates again in preparation for Stadium Series',
        body: 'Colorado Avalanche head coach Patrick Roy was back in his natural habitat Wednesday: Between the pipes. Sporting full goalie get-up, Roy could be seen skating with the Avs, sharpening his skills for the Stadium Series Alumni Game. "Today was my second day," said Roy of his session, speaking to the team website after practice. "If I could lose 30 pounds that would help."',
        rating: 0
      })
    );
};
