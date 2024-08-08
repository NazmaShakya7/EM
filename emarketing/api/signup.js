const fastify = require('fastify')({ logger: true });
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const secret = '12345'; 
const setupLogin = async () => {

  fastify.post('/company/login', async (request, reply) => {
    const { username, password } = request.body;
    const user = await User.findOne({ username });

    if (!user) {
      return reply.send({ success: false, message: 'User not found' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return reply.send({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, secret, {
      expiresIn: '1h',
    });

    reply.send({ success: true, token });
  });
}

module.exports =setupLogin;
