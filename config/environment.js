const development={
    name:'development',
    asset_path:'./assets',
    session_cookie_key:'blahSomething',
    db:'Authentication',
    google_client_id: '199777170750-dtlp1ftt4tbp7e7phru8n1j7nj59smd9.apps.googleusercontent.com',
    google_client_secret: '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',
    google_callback_url: 'http://localhost:5000/auth/google/callback',
}

const production={
    name:'production'
}

module.exports=development;