import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    let createEntityCommand = vscode.commands.registerCommand('extension.createEntity', async (folder: vscode.Uri) => {
      const entitySettings = await promptForEntitySettings();
      if (entitySettings) {
        createEntity(folder.fsPath, entitySettings);
      }
    });

    context.subscriptions.push(createEntityCommand);
}

export async function promptForEntitySettings(): Promise<any | null> {
    const className = await vscode.window.showInputBox({ prompt: 'Class Name (required)' });
    if (!className) {
        return null;
    }

    const printName = await vscode.window.showInputBox({ prompt: 'Print Name (optional)', value: 'New Entity' });
    const category = await vscode.window.showInputBox({ prompt: 'Category (optional)', value: 'Other' });

    const propOrEntity = await vscode.window.showQuickPick(['Prop', 'Entity'], { placeHolder: 'Prop / Entity (optional)' });
    const defaultType = propOrEntity || 'Prop';

    const display3DName = await vscode.window.showQuickPick(['Yes', 'No'], { placeHolder: '3D Name (optional)' });
    const show3DName = display3DName === 'Yes';

    let display3DNameText = printName;
	let display3DNameFont = 'DermaLarge';
    if (show3DName) {
        display3DNameText = await vscode.window.showInputBox({ prompt: '3D Name Text (optional)', value: printName });
		display3DNameFont = await vscode.window.showInputBox({ prompt: '3D Name Font (optional)', value: 'DermaLarge' }) || 'DermaLarge';
    }

    const modelPath = await vscode.window.showInputBox({ prompt: 'Model Path (optional)', value: '' });

    return {
        className,
        printName: printName || 'New Entity',
        category: category || 'Other',
        entityType: defaultType,
        show3DName,
        display3DNameText: display3DNameText || printName,
        display3DNameFont: display3DNameFont || 'DermaLarge',
        modelPath: modelPath || ''
    };
}


export function createEntity(folderPath: string, entitySettings: any) {
    const classNamePath = path.join(folderPath, entitySettings.className);
    if (!fs.existsSync(classNamePath)) {
        fs.mkdirSync(classNamePath);
    }

    const clInitContent = createClInitContent(entitySettings);
    const initContent = createInitContent(entitySettings);
    const sharedContent = createSharedContent(entitySettings);

    fs.writeFileSync(path.join(classNamePath, 'cl_init.lua'), clInitContent);
    fs.writeFileSync(path.join(classNamePath, 'init.lua'), initContent);
    fs.writeFileSync(path.join(classNamePath, 'shared.lua'), sharedContent);

    vscode.window.showInformationMessage('Entity created successfully!');
}

function createClInitContent(entitySettings: any): string {
    const { display3DNameFont, display3DNameText, show3DName } = entitySettings;

    if (show3DName) {
        return `AddCSLuaFile()
include("shared.lua")

ENT.RenderGroup = RENDERGROUP_BOTH

function ENT:Draw()
    self:DrawModel()
end

function ENT:DrawTranslucent()
    if self:GetPos():DistToSqr( LocalPlayer():GetPos() ) < 10000 then
        surface.SetFont("${display3DNameFont}")
        local textw, texth = surface.GetTextSize("${display3DNameText}")
        local w = 5 + textw + 5
        local h = 2 + texth + 2
        local x, y = -w / 2, -h / 2

        local ang = LocalPlayer():EyeAngles()
        ang:RotateAroundAxis(ang:Forward(), 90)
        ang:RotateAroundAxis(ang:Right(), 90)
        local pos = self:GetPos() + (self:GetAngles():Up() * 50)
        cam.Start3D2D(pos, Angle(0, ang.y, 90), 0.25)
            surface.SetFont("${display3DNameFont}")
            surface.SetDrawColor(Color(0, 0, 0, 200))
            surface.DrawRect(x, y, w, h)
            draw.SimpleTextOutlined("${display3DNameText}", "${display3DNameFont}", 0, 0, Color(255, 255, 255), TEXT_ALIGN_CENTER, TEXT_ALIGN_CENTER, 1, Color(0, 0, 0))
        cam.End3D2D()
    end
end`;
    } else {
        return `AddCSLuaFile()
include("shared.lua")
	
function ENT:Draw()
    self:DrawModel()
end`;
    }
}

function createInitContent(entitySettings: any): string {
    const { entityType, modelPath } = entitySettings;

    if (entityType === 'Prop') {
        return `AddCSLuaFile("cl_init.lua")
AddCSLuaFile("shared.lua")
include("shared.lua")

function ENT:Initialize()
    self:SetUseType(SIMPLE_USE)
    self:SetModel("${modelPath}")
    self:PhysicsInit(SOLID_VPHYSICS)
    self:SetSolid(SOLID_VPHYSICS)

    self:DropToFloor()
end

function ENT:AcceptInput(Name, Activator, ply)
    if Name == "Use" and ply:IsPlayer() then
        // Run your interaction code here
    end
end`;
    } else {
        return `include("shared.lua")

function ENT:Initialize()
    self:SetUseType(SIMPLE_USE)
    self:SetModel("${modelPath}")
    self:PhysicsInitStatic(SOLID_BBOX)

    local sequenceId, duration = self:LookupSequence("idle_all_01")
    self:SetSequence(sequenceId)

    self:DropToFloor()
end

function ENT:SetCustomModel(model)
    self:SetModel(model)

    local sequenceId, duration = self:LookupSequence("idle_all_01")
    self:SetSequence(sequenceId)
end

function ENT:AcceptInput(Name, Activator, ply)
    if Name == "Use" and ply:IsPlayer() then
        // Run your code here
    end
end`;
    }
}

function createSharedContent(entitySettings: any): string {
    const { entityType, printName, category } = entitySettings;

    if (entityType === 'Prop') {
        return `ENT.Type = "anim"
ENT.Base = "base_gmodentity"

ENT.PrintName = "${printName}"
ENT.Category = "${category}"

ENT.Spawnable = true
ENT.AdminSpawnable = true`;
    } else {
        return `AddCSLuaFile()
    
ENT.Type = "anim"
ENT.Base = "base_anim"
    
ENT.PrintName = "${printName}"
ENT.Category = "${category}"
    
ENT.Spawnable = true
ENT.AdminSpawnable = true`;
    }
}
