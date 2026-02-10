import * as iconv from 'iconv-lite';

export class Input {
    private static configurado = false;
    private static encodingConsole: string = 'cp850';

    private static detectarEncoding(): void {
        if (this.configurado) return;

        if (process.platform === 'win32') {
            try {
                const { execSync } = require('child_process');
                const resultado = execSync('chcp', {
                    encoding: 'utf8',
                }).toString();

                const match = resultado.match(/\d+/);

                if (match) {
                    const codePage = match[0];
                    this.encodingConsole =
                        codePage === '65001' ? 'utf8' : 
                        codePage === '850' ? 'cp850' : 
                        codePage === '1252' ? 'cp1252' : `cp${codePage}`;
                }
            } catch (error) {
                this.encodingConsole = 'cp850';
            }
        } else {
            this.encodingConsole = 'utf8';
        }

        this.configurado = true;
    }

    private static converterParaConsole(texto: string): string {
        const buffer = iconv.encode(texto, this.encodingConsole);
        return buffer.toString('binary');
    }

    private static converterDoConsole(textoRaw: string): string {
        const buffer = Buffer.from(textoRaw, 'binary');
        return iconv.decode(buffer, this.encodingConsole);
    }

    private static prepararConfig(config?: any): any {
        this.detectarEncoding();

        let configFinal: any = {
            encoding: 'binary',
            ...config,
        };

        if (config?.defaultInput !== undefined) {
            configFinal.defaultInput = this.converterParaConsole(String(config.defaultInput));
        }

        if (config?.limitMessage) {
            configFinal.limitMessage = this.converterParaConsole(config.limitMessage);
        }

        return configFinal;
    }

    static question(pergunta: string, config?: any): string {
        const readlinesync = require('readline-sync');
        const perguntaConvertida = this.converterParaConsole(pergunta);
        const configFinal = this.prepararConfig(config);
        const respostaRaw = readlinesync.question(perguntaConvertida, configFinal);
        return this.converterDoConsole(respostaRaw);
    }

    static questionInt(pergunta: string, config?: any): number {
        const readlinesync = require('readline-sync');
        const perguntaConvertida = this.converterParaConsole(pergunta);
        const configComMensagem = {
            limitMessage: 'Digite um numero inteiro!',
            ...config
        };
        const configFinal = this.prepararConfig(configComMensagem);
        return readlinesync.questionInt(perguntaConvertida, configFinal);
    }

    static questionFloat(pergunta: string, config?: any): number {
        const readlinesync = require('readline-sync');
        const perguntaConvertida = this.converterParaConsole(pergunta);
        const configComMensagem = {
            limitMessage: 'Digite um numero decimal!',
            ...config
        };
        const configFinal = this.prepararConfig(configComMensagem);
        return readlinesync.questionFloat(perguntaConvertida, configFinal);
    }

    static keyInSelect(opcoes: string[], pergunta: string, config?: any): number {
        this.detectarEncoding();
        const readlinesync = require('readline-sync');
        const perguntaConvertida = this.converterParaConsole(pergunta);
        const opcoesConvertidas = opcoes.map((opcao) => this.converterParaConsole(opcao));
        return readlinesync.keyInSelect(opcoesConvertidas, perguntaConvertida, config);
    }

    static keyInYNStrict(pergunta: string, config?: any): boolean {
        this.detectarEncoding();
        const readlinesync = require('readline-sync');
        const perguntaConvertida = this.converterParaConsole(pergunta);
        return readlinesync.keyInYNStrict(perguntaConvertida, config);
    }

    static prompt(): void {
        const readlinesync = require('readline-sync');
        readlinesync.prompt();
    }

    static getEncoding(): string {
        this.detectarEncoding();
        return this.encodingConsole;
    }
}