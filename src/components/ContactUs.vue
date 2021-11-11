<template>
  <div class="container">
    <form @submit.prevent="sendEmail">
      <label>Name</label>
      <input type="text" v-model="name" name="name" placeholder="Your Name" />
      <label>Email</label>
      <input
        type="email"
        v-model="email"
        name="email"
        placeholder="Your Email"
      />
      <label>Message</label>
      <textarea
        name="message"
        v-model="message"
        cols="30"
        rows="5"
        placeholder="Message"
      >
      </textarea>

      <input type="submit" value="Send" />
    </form>
  </div>
</template>

<script>
import emailjs from 'emailjs-com';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
export default {
  data() {
    return {
      fbuser: '',
      flag: false,
      name: '',
      email: '',
      message: ''
    };
  },
  beforeMount() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.fbuser = auth.currentUser.email;
        this.checkWeight();
      }
    });
  },
  methods: {
    sendEmail(e) {
      try {
        emailjs.sendForm(
          'service_x6p4cvh',
          'template_fycdtwj',
          e.target,
          'user_CIdULz2hR9PuMc1mHs7FF',
          {
            name: this.name,
            email: this.email,
            message: this.message,
          }
        );
      } catch (error) {
        console.log({ error });
      }
      // Reset form field
      this.name = '';
      this.email = '';
      this.message = '';
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

label {
  float: left;
}
input[type='text'],
[type='email'],
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type='submit'] {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type='submit']:hover {
  background-color: #b8c7b9;
}

.container {
  display: block;
  margin: auto;
  text-align: center;
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  width: 50%;
}
</style>
