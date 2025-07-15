import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Seu Ponto Digital API',
      version: '1.0.0',
      description: `API para gerenciamento de ponto digital e contratos de trabalho
      
      ## Funcionalidades Principais:
      - Autenticação JWT
      - Gerenciamento de funcionários e empregadores
      - Contratos com validação automática
      - Cronogramas de trabalho com regras trabalhistas
      - Registros de ponto em tempo real
      - Alertas automáticos (atrasos, ausências)
      - Endereços de trabalho com GPS
      - Assinatura digital de contratos
      
      ## Middleware de Validação:
      - **Work Schedule**: Valida automaticamente as regras trabalhistas (5 dias = max 10h48min/dia, 6 dias = max 10h em 5 dias + 4h no 6º dia)
      - **Authentication**: Todas as rotas privadas requerem token Bearer JWT
      `,
      contact: {
        name: 'Seu Ponto Digital',
        email: 'seupontodigital@gmail.com.com'
      },
    },
    servers: [
      {
        url: 'https://two025-1-t01-seupontodigital.onrender.com/api',
        description: 'Servidor de desenvolvimento'
      },
      {
        url: 'https://api.seupontodigital.com/api',
        description: 'Servidor de produção'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensagem de erro'
            }
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do usuário'
            },
            password: {
              type: 'string',
              description: 'Senha do usuário'
            }
          }
        },
        LoginResponse: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              description: 'Token JWT de autenticação'
            },
            user: {
              type: 'object',
              description: 'Dados do usuário autenticado'
            }
          }
        },
        Employee: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID único do funcionário'
            },
            name: {
              type: 'string',
              description: 'Nome completo do funcionário'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do funcionário'
            },
            phone: {
              type: 'string',
              description: 'Telefone do funcionário'
            },
            cpf: {
              type: 'string',
              description: 'CPF do funcionário'
            },
            birth_date: {
              type: 'string',
              format: 'date',
              description: 'Data de nascimento'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação do registro'
            }
          }
        },
        Employer: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID único do empregador'
            },
            name: {
              type: 'string',
              description: 'Nome/Razão social do empregador'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do empregador'
            },
            phone: {
              type: 'string',
              description: 'Telefone do empregador'
            },
            cnpj: {
              type: 'string',
              description: 'CNPJ do empregador'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação do registro'
            }
          }
        },
        Contract: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID único do contrato'
            },
            employee_id: {
              type: 'integer',
              description: 'ID do funcionário'
            },
            employer_id: {
              type: 'integer',
              description: 'ID do empregador'
            },
            start_date: {
              type: 'string',
              format: 'date',
              description: 'Data de início do contrato'
            },
            end_date: {
              type: 'string',
              format: 'date',
              description: 'Data de fim do contrato'
            },
            salary: {
              type: 'number',
              format: 'float',
              description: 'Salário do contrato'
            },
            status: {
              type: 'string',
              enum: ['active', 'inactive', 'pending'],
              description: 'Status do contrato'
            },
            access_app: {
              type: 'boolean',
              description: 'Se o funcionário tem acesso ao app'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação do registro'
            }
          }
        },
        WorkSchedule: {
          type: 'object',
          description: 'Cronograma de trabalho com validação automática das leis trabalhistas',
          properties: {
            id: {
              type: 'integer',
              description: 'ID único do cronograma'
            },
            contract_id: {
              type: 'integer',
              description: 'ID do contrato'
            },
            segunda: {
              type: 'object',
              nullable: true,
              description: 'Horários de segunda-feira (null se não trabalhar)',
              properties: {
                start: {
                  type: 'string',
                  format: 'time',
                  description: 'Horário de início (HH:MM)'
                },
                end: {
                  type: 'string',
                  format: 'time',
                  description: 'Horário de fim (HH:MM)'
                },
                break_start: {
                  type: 'string',
                  format: 'time',
                  description: 'Início do intervalo (HH:MM)'
                },
                break_end: {
                  type: 'string',
                  format: 'time',
                  description: 'Fim do intervalo (HH:MM)'
                }
              }
            },
            terca: {
              type: 'object',
              nullable: true,
              properties: {
                start: { type: 'string', format: 'time' },
                end: { type: 'string', format: 'time' },
                break_start: { type: 'string', format: 'time' },
                break_end: { type: 'string', format: 'time' }
              }
            },
            quarta: {
              type: 'object',
              nullable: true,
              properties: {
                start: { type: 'string', format: 'time' },
                end: { type: 'string', format: 'time' },
                break_start: { type: 'string', format: 'time' },
                break_end: { type: 'string', format: 'time' }
              }
            },
            quinta: {
              type: 'object',
              nullable: true,
              properties: {
                start: { type: 'string', format: 'time' },
                end: { type: 'string', format: 'time' },
                break_start: { type: 'string', format: 'time' },
                break_end: { type: 'string', format: 'time' }
              }
            },
            sexta: {
              type: 'object',
              nullable: true,
              properties: {
                start: { type: 'string', format: 'time' },
                end: { type: 'string', format: 'time' },
                break_start: { type: 'string', format: 'time' },
                break_end: { type: 'string', format: 'time' }
              }
            },
            sabado: {
              type: 'object',
              nullable: true,
              properties: {
                start: { type: 'string', format: 'time' },
                end: { type: 'string', format: 'time' },
                break_start: { type: 'string', format: 'time' },
                break_end: { type: 'string', format: 'time' }
              }
            },
            domingo: {
              type: 'object',
              nullable: true,
              properties: {
                start: { type: 'string', format: 'time' },
                end: { type: 'string', format: 'time' },
                break_start: { type: 'string', format: 'time' },
                break_end: { type: 'string', format: 'time' }
              }
            }
          },
          example: {
            segunda: { start: "08:00", end: "18:00", break_start: "12:00", break_end: "13:00" },
            terca: { start: "08:00", end: "18:00", break_start: "12:00", break_end: "13:00" },
            quarta: { start: "08:00", end: "18:00", break_start: "12:00", break_end: "13:00" },
            quinta: { start: "08:00", end: "18:00", break_start: "12:00", break_end: "13:00" },
            sexta: { start: "08:00", end: "18:00", break_start: "12:00", break_end: "13:00" },
            sabado: null,
            domingo: null
          },
          'x-validation-rules': {
            description: 'Regras de validação automática aplicadas',
            rules: [
              'Para 5 dias de trabalho: máximo 10h48min por dia',
              'Para 6 dias de trabalho: máximo 10h em 5 dias + 4h no 6º dia',
              'Intervalo mínimo: 30 minutos',
              'Intervalo máximo: 2 horas',
              'Horário de início deve ser anterior ao horário de fim',
              'Intervalo deve estar dentro do período de trabalho'
            ]
          }
        },
        Worklog: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID único do registro'
            },
            contract_id: {
              type: 'integer',
              description: 'ID do contrato'
            },
            date: {
              type: 'string',
              format: 'date',
              description: 'Data do registro'
            },
            clock_in: {
              type: 'string',
              format: 'time',
              description: 'Horário de entrada'
            },
            clock_out: {
              type: 'string',
              format: 'time',
              description: 'Horário de saída'
            },
            break_start: {
              type: 'string',
              format: 'time',
              description: 'Início do intervalo'
            },
            break_end: {
              type: 'string',
              format: 'time',
              description: 'Fim do intervalo'
            },
            total_hours: {
              type: 'string',
              description: 'Total de horas trabalhadas'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação do registro'
            }
          }
        },
        Alert: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID único do alerta'
            },
            contract_id: {
              type: 'integer',
              description: 'ID do contrato'
            },
            type: {
              type: 'string',
              enum: ['late', 'absence', 'overtime'],
              description: 'Tipo do alerta'
            },
            message: {
              type: 'string',
              description: 'Mensagem do alerta'
            },
            date: {
              type: 'string',
              format: 'date',
              description: 'Data do alerta'
            },
            resolved: {
              type: 'boolean',
              description: 'Se o alerta foi resolvido'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação do alerta'
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Authentication',
        description: 'Endpoints de autenticação'
      },
      {
        name: 'Employees',
        description: 'Gerenciamento de funcionários'
      },
      {
        name: 'Employers',
        description: 'Gerenciamento de empregadores'
      },
      {
        name: 'Contracts',
        description: 'Gerenciamento de contratos'
      },
      {
        name: 'Work Schedule',
        description: 'Cronogramas de trabalho com validação automática'
      },
      {
        name: 'Worklog',
        description: 'Registros de ponto e folhas de ponto'
      },
      {
        name: 'Alerts',
        description: 'Alertas do sistema (atrasos, ausências, etc.)'
      },
      {
        name: 'Address',
        description: 'Endereços residenciais'
      },
      {
        name: 'Work Address',
        description: 'Endereços de trabalho com coordenadas GPS'
      },
      {
        name: 'Work Breaks',
        description: 'Intervalos de trabalho'
      },
      {
        name: 'Sign Contract',
        description: 'Assinatura de contratos'
      },
      {
        name: 'Employ',
        description: 'Vínculos empregatícios'
      }
    ]
  },
  apis: ['./src/routes/*.js', './src/controllers/**/*.js'] // Caminhos para os arquivos com documentação
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export { swaggerUi, swaggerSpec };
