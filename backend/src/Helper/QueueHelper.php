<?php

namespace App\Helper;

use App\DTO\CommentDTO;
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

class QueueHelper
{
    public static function queueUserCommentedEmail(CommentDTO $commentDTO)
    {
        $connection = new AMQPStreamConnection('rabbitmq', 5672, 'user', 'password');
        $channel = $connection->channel();

        $channel->queue_declare('email_queue', false, true, false, false);

        $emailData = json_encode([
            'postId' => $commentDTO->postId,
            'userEmail' => $commentDTO->post->getUser()->getEmail()
        ]);

        $msg = new AMQPMessage($emailData, ['delivery_mode' => 2]);
        $channel->basic_publish($msg, '', 'email_queue');

        $channel->close();
        $connection->close();
    }
}
