import * as LucideReact from "lucide-react";
import React from "react";

import { Accordion } from "~/components/ui/accordion";
import { Alert } from "~/components/ui/alert";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Avatar } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Breadcrumb } from "~/components/ui/breadcrumb";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { Collapsible } from "~/components/ui/collapsible";
import { ContextMenu } from "~/components/ui/context-menu";
import { Dialog } from "~/components/ui/dialog";
import { Drawer } from "~/components/ui/drawer";
import { DropdownMenu } from "~/components/ui/dropdown-menu";
import { Empty } from "~/components/ui/empty";
import { HoverCard } from "~/components/ui/hover-card";
import { Input } from "~/components/ui/input";
import { InputOTP } from "~/components/ui/input-otp";
import { Kbd } from "~/components/ui/kbd";
import { Label } from "~/components/ui/label";
import { Menubar } from "~/components/ui/menubar";
import { NavigationMenu } from "~/components/ui/navigation-menu";
import { Popover } from "~/components/ui/popover";
import { Progress } from "~/components/ui/progress";
import { RadioGroup } from "~/components/ui/radio-group";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Select } from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
import { Sheet } from "~/components/ui/sheet";
import { Skeleton } from "~/components/ui/skeleton";
import { Slider } from "~/components/ui/slider";
import { Spinner } from "~/components/ui/spinner";
import { Switch } from "~/components/ui/switch";
import { Table } from "~/components/ui/table";
import { Tabs } from "~/components/ui/tabs";
import { Textarea } from "~/components/ui/textarea";
import { Toggle } from "~/components/ui/toggle";
import { Tooltip } from "~/components/ui/tooltip";
import { AlertDialog } from "~/components/ui/alert-dialog";
import { Calendar } from "~/components/ui/calendar";
import { Carousel } from "~/components/ui/carousel";
import { Pagination } from "~/components/ui/pagination";
import { Command } from "~/components/ui/command";
import { Form } from "~/components/ui/form";
import { ButtonGroup } from "~/components/ui/button-group";
import { Field } from "~/components/ui/field";
import { Item } from "~/components/ui/item";
import { InputGroup } from "~/components/ui/input-group";
import { ToggleGroup } from "~/components/ui/toggle-group";
import { Sidebar } from "~/components/ui/sidebar";

export const LIBRARY_REGISTRY = {
  react: React,
  "lucide-react": LucideReact,
  "~/components/ui/accordion": Accordion,
  "~/components/ui/alert": Alert,
  "~/components/ui/aspect-ratio": AspectRatio,
  "~/components/ui/avatar": Avatar,
  "~/components/ui/badge": Badge,
  "~/components/ui/breadcrumb": Breadcrumb,
  "~/components/ui/button": Button,
  "~/components/ui/card": Card,
  "~/components/ui/checkbox": Checkbox,
  "~/components/ui/collapsible": Collapsible,
  "~/components/ui/context-menu": ContextMenu,
  "~/components/ui/dialog": Dialog,
  "~/components/ui/drawer": Drawer,
  "~/components/ui/dropdown-menu": DropdownMenu,
  "~/components/ui/empty": Empty,
  "~/components/ui/hover-card": HoverCard,
  "~/components/ui/input": Input,
  "~/components/ui/input-otp": InputOTP,
  "~/components/ui/kbd": Kbd,
  "~/components/ui/label": Label,
  "~/components/ui/menubar": Menubar,
  "~/components/ui/navigation-menu": NavigationMenu,
  "~/components/ui/popover": Popover,
  "~/components/ui/progress": Progress,
  "~/components/ui/radio-group": RadioGroup,
  "~/components/ui/scroll-area": ScrollArea,
  "~/components/ui/select": Select,
  "~/components/ui/separator": Separator,
  "~/components/ui/sheet": Sheet,
  "~/components/ui/skeleton": Skeleton,
  "~/components/ui/slider": Slider,
  "~/components/ui/spinner": Spinner,
  "~/components/ui/switch": Switch,
  "~/components/ui/table": Table,
  "~/components/ui/tabs": Tabs,
  "~/components/ui/textarea": Textarea,
  "~/components/ui/toggle": Toggle,
  "~/components/ui/tooltip": Tooltip,
  "~/components/ui/alert-dialog": AlertDialog,
  "~/components/ui/calendar": Calendar,
  "~/components/ui/carousel": Carousel,
  "~/components/ui/pagination": Pagination,
  "~/components/ui/command": Command,
  "~/components/ui/form": Form,
  "~/components/ui/button-group": ButtonGroup,
  "~/components/ui/field": Field,
  "~/components/ui/item": Item,
  "~/components/ui/input-group": InputGroup,
  "~/components/ui/toggle-group": ToggleGroup,
  "~/components/ui/sidebar": Sidebar,
};
