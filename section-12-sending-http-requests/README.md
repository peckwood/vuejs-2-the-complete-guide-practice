# Section 12: Sending Http Requests

### 153 How to (Not) send Http Requests

we usually dont sent http request using `<button type='submit'>` inside `<forms>` anymore

Instead, to send http requests, we can use third party packages like **axios**

another option is **fetch**, which is built-in method, which can send data to server, or get data from server

Both can send async requests

### 154 Sending a POST request to store data

#### Enable CORS in Spring

Since we are accessing localhost:8081 from localhost:8080, which will cause CORS, we need to enable CORS.

In Spring, we can allow access from any source using

```java
@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**");
    }
}
```

> [CORS with Spring | Baeldung](https://www.baeldung.com/spring-cors)

#### Use Spring JPA to save Data

> [Spring Data - CrudRepository save() Method | Baeldung](https://www.baeldung.com/spring-data-crud-repository-save)

Entity:

```java
@Data
@Entity
public class Survey {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String rating;
}
```

Repository:

```java
@Repository
public interface ISurveyDAO extends JpaRepository<Survey, String> {
}
```

Controller:

```java
    @PostMapping("save-survey")
    public Map<String, Object> saveSurvey(@RequestBody Survey survey){
        iSurveyDAO.save(survey);
        Map<String, Object> result = new HashMap<>();
        result.put("code", 0);
        return result;
    }
```

#### Use fetch to send data from frontend

```javascript
      fetch('http://localhost:8081/springbootapp/save-survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.enteredName,
          rating: this.chosenRating
        })
      });
```

