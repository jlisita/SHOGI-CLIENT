import "./ForumCategories.css"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const ForumCategories = () => {


    const [categories, setCategories] = useState([]);
    const [topics, setTopics] = useState([]);
    const [comments, setComments] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/categories')
        .then((response) => {
            return response.json();
            })
            .then((data) => {
                setCategories(data.data)
                console.log(`categorie = ${data.data}`);
            })
            .catch((error) => console.error('Erreur lors de la récupération des catégories:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:3000/api/topics')
        .then((response) => {
            return response.json();
            })
            .then((data) => {
                setTopics(data.data)
                console.log(`topics = ${data.data}`);
            })
            .catch((error) => console.error('Erreur lors de la récupération des topics:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:3000/api/comments')
        .then((response) => {
            return response.json();
            })
            .then((data) => {
                setComments(data.data)
                console.log(`comments = ${data.data}`);
            })
            .catch((error) => console.error('Erreur lors de la récupération des commentaires:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:3000/api/users')
        .then((response) => {
            return response.json();
            })
            .then((data) => {
                setUsers(data.data)
                console.log(`users = ${data.data}`);
            })
            .catch((error) => console.error('Erreur lors de la récupération des utilisateurs:', error));
    }, []);


    const getTopicById = (topic_id) => topics.find(topic => topic.id == topic_id);  
    
    const topicsByCategory = (category_id) => topics.filter((topic) => topic.CategoryId == category_id);

    const nbrTopicsByCategory = (category_id) => topicsByCategory(category_id).length;

    const commentsByCategory = (category_id) => comments.filter(comment => getTopicById(comment.TopicId).CategoryId == category_id);
    
    const lastCommentByCategory = (category_id) => {
            return commentsByCategory(category_id).sort((a,b) => new Date(b.created_at) - new Date(a.created_at))[0];
        }   

    const getUserById = (user_id) => users.find(user => user.id == user_id);

    const lastCommentByCategoryUser = (category_id) => getUserById(lastCommentByCategory(category_id) && lastCommentByCategory(category_id).UserId);

    return (
        <div>
            <section className="bannerCategories banner">
            </section>
            <section className="categories main-content">
                <h1 className="main-content-title">Forum ShogiConnect</h1>
                <h2>Liste des catégories</h2>
                <div className="categories-list">
                    <table className="categories-list-table">
                        <thead>
                            <tr>
                            <th>Catégorie</th>
                            <th>Topics</th>
                            <th>Dernier message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!categories ? <tr><td>En cours de chargement</td></tr>:
                             categories.map((category) => (
                            <tr key={category.id}>
                                <td> <Link className = "categories-table-title" to={`/forum/category/${category.id}`}>{category.title}</Link><br/>{category.description}</td>
                                <td>{nbrTopicsByCategory(category.id)}</td>
                                <td>
                                    {!lastCommentByCategory(category.id) ? `-` : `le ${ new Date(lastCommentByCategory(category.id).created_at).toLocaleDateString('fr-FR')} à 
                                    ${new Date(lastCommentByCategory(category.id).created_at).toLocaleTimeString()}`}
                                    <br/> 
                                    { !lastCommentByCategoryUser(category.id) ? `-`: 
                                    `par ${  lastCommentByCategoryUser(category.id).username }`} 
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};
export default ForumCategories;