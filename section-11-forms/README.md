# Forms

### 142 Working with v-model Modifiers and Numbers

Even you can only type numbers inside `<input type='number'>` , you still get string from this input.

#### v-model auto conversion

v-model, if used on an input of type number, **automatically** converts user input from a string to a number.

You can force it even on input of type text with modifier `v-model.number`

#### modifiers

`.lazy` listen to `change` event instead of `input`

`.trim` removes white space

### 144 Using v-model with Checkboxes & Radiobuttons

#### checkboxes

- you will get an **array** if you have a group of checkboxes which share the same `name` attribute value, you get an array
- you will get a **Boolean** if you have a single checkbox
- all checkboxes of the same group bind to this array
- all checkbox inputs need to have **value** attribute, otherwise Vue doesn't know which value to add to this array

#### radio buttons

- bind to regular value
- all checkboxes of the same group bind to this variable
- all radio buttons inputs need to have **value** attribute
- variable's value = selected radio button's value

### 145  Adding Basic Form Validation

you can add validation on blur event

```
<input id="user-name" name="user-name" type="text" v-model.trim='userName' @blur='validateInput'/>
```

```
    validateInput(){
      if(this.userName === ''){
        this.usernameValidity = 'invalid';
      }else{
        this.usernameValidity = 'valid';
      }
    }
```

when usernameValidity is invalid, you can show an paragraph

```
<p v-if='usernameValidity === "invalid"'>Please enter a valid name!</p>
```

or change styling

```
<div class="form-control" :class='{invalid:this.usernameValidity === "invalid"}'>
      <label for="user-name">Your Name</label>
      <input id="user-name" name="user-name" type="text" v-model.trim='userName' @blur='validateInput'/>
</div>
```

```css
div.form-control.invalid input {
  border-color: red;
}

div.form-control.invalid label {
  color: red;
}
```

