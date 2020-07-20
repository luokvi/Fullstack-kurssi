
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 0){
        return 0
    }
    if (blogs.length === 1){
        return blogs[0].likes
    }

    const reducer = (sum, item) => {
        return sum + item.likes
    }
    
    return blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
    if (blogs.length === 0){
        return null
    }
    let favourite = {
        title: blogs[0].title,
        author: blogs[0].author,
        likes: blogs[0].likes
    }
    blogs.forEach(b => {
        if (b.likes > favourite.likes){
            favourite = {
                title: b.title,
                author: b.author,
                likes: b.likes
            }
        }
    })

    return favourite
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}