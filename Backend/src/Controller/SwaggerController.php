<?php

namespace App\Controller;

use Nelmio\ApiDocBundle\Controller\SwaggerUiController;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SwaggerController extends AbstractController
{
    #[Route('/api/docs', name: 'swagger_ui', methods: ['GET'])]
    public function swagger(): Response
    {
        return $this->forward(SwaggerUiController::class, [
            'swagger_data_url' => '/api/doc.json',
        ]);
    }
}