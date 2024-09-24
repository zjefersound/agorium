<?php

namespace App\Command;

use App\Service\MailerService;
use PhpAmqpLib\Connection\AMQPStreamConnection;

class EmailConsumer
{
    private MailerService $mailerService;

    public function __construct(MailerService $mailerService)
    {
        $this->mailerService = $mailerService;
    }

    public function consume()
    {
        $connection = new AMQPStreamConnection('rabbitmq', 5672, 'user', 'password');
        $channel = $connection->channel();

        $channel->queue_declare('email_queue', false, true, false, false);

        $callback = function ($msg) {
            $data = json_decode($msg->body, true);
            $this->mailerService->sendCommentedEmail($data['userEmail'], $data['postId']);
        };

        $channel->basic_consume('email_queue', '', false, true, false, false, $callback);

        while ($channel->is_consuming()) {
            $channel->wait();
        }
    }
}
