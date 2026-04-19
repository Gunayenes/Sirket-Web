import type { LucideProps } from 'lucide-react';
import {
  Globe, Smartphone, Code2, Database, Bot, Server, BarChart3, Wrench,
  Zap, ArrowRight, CheckCircle2, Target, Lightbulb, Users, Award,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  Globe, Smartphone, Code2, Database, Bot, Server, BarChart3, Wrench,
  Zap, ArrowRight, CheckCircle2, Target, Lightbulb, Users, Award,
};

export function getIcon(name: string): React.ComponentType<LucideProps> {
  return ICON_MAP[name] || Zap;
}
